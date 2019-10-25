import { Component, Input, OnInit } from '@angular/core';
import {
  PackageRegistryService,
  DependencyTree
} from '../package-registry/package-registry.service';
import { tap, mergeMap, map } from 'rxjs/operators';
import { Dependency } from '../models/dependency.model';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {
  @Input() packageDependencies: Dependency[];

  state: 'analyzing' | 'findingAlternatives' | 'displayingAlternatives' =
    'analyzing';

  // TODO: come up with a better "model" for the current dependency scores and alternatives
  currentTreeScore = 0;
  alternatives = null;

  private currentPackageIdx = 0;

  get currentPackage() {
    return this.packageDependencies[this.currentPackageIdx];
  }

  constructor(private packageRegistry: PackageRegistryService) {}

  ngOnInit() {
    this.analyzePackage();
  }

  nextPackage() {
    this.currentPackageIdx++;

    if (this.currentPackageIdx >= this.packageDependencies.length) {
      // what is the "finish" state?
    } else {
      this.analyzePackage();
    }
  }

  private analyzePackage() {
    const { name, version } = this.currentPackage;

    this.state = 'analyzing';

    this.packageRegistry
      .getDepTree(name, version)
      .pipe(
        tap(tree => {
          this.currentPackage.dependencyScore = tree.getScore();
        }),
        mergeMap(() =>
          this.packageRegistry.searchSpecificPackage(name).pipe(
            tap(result => {
              this.currentPackage.description =
                result.package.description || '';
              this.currentPackage.optimal = result.score.final;
              this.currentPackage.maintenance = result.score.detail.maintenance;
              this.currentPackage.popularity = result.score.detail.popularity;
              this.currentPackage.quality = result.score.detail.quality;
            })
          )
        ),
        mergeMap(() => {
          console.log('finidng alts');
          this.state = 'findingAlternatives';

          return this.packageRegistry
            .search(this.currentPackage.description)
            .pipe(
              mergeMap(searchResults => {
                console.log('fork joinigng on search results');
                console.log('potentials', searchResults);
                return forkJoin(
                  searchResults
                    .filter(
                      result =>
                        result.searchScore > 0.000000001 ||
                        name === result.package.name
                    ) // phew, low bar
                    .map(result => {
                      return this.packageRegistry
                        .getDepTree(result.package.name)
                        .pipe(
                          tap(() => console.log('here iam')),
                          map(
                            tree =>
                              new Dependency(
                                result.package.name,
                                result.package.version,
                                result.package.description,
                                tree.getScore(),
                                result.score.final,
                                result.score.detail.quality,
                                result.score.detail.maintenance,
                                result.score.detail.popularity
                              )
                          )
                        );
                    })
                );
              }),
              tap(alternatives => {
                this.state = 'displayingAlternatives';
                console.log('found these alts', alternatives);
                // filter out any alternatives that have a worse tree score than the current package
                this.currentPackage.alternatives = alternatives.filter(
                  alt => alt.treeScore < this.currentPackage.treeScore
                );

                console.log(
                  'after filtering',
                  this.currentPackage.alternatives
                );
              })
            );
        })
      )
      .subscribe(() => {
        // if this.currentPackage.isGoodEnough(), just call nextPackage() right here.

        if (!this.currentPackage.alternatives.length) {
          this.nextPackage();
        }
      });
  }

  removeLowScoringDependencies(dependencies: Dependency[]) {
    for (let i = dependencies.length - 1; i <= 0; i--) {
      if (dependencies[i].dependencyScore <= 1) {
        dependencies.splice(i, 1);
      }
    }
    return dependencies;
  }

  removeWorseAlternatives(dependencies: Dependency[]) {
    for (let i = dependencies.length - 1; i >= 0; i--) {
      for (let j = dependencies[i].alternatives.length - 1; j <= 0; j--) {
        if (
          dependencies[i].treeScore > dependencies[i].alternatives[j].treeScore
        ) {
          dependencies[i].alternatives.splice(j, 1);
        }
      }
      if (dependencies[i].alternatives.length === 0) {
        dependencies.splice(i, 1);
      }
    }
    return dependencies;
  }

  // TODO: Implement and put somewhere else, probably.
  private calcTreeScore(tree: DependencyTree) {
    return Math.random();
  }
}
