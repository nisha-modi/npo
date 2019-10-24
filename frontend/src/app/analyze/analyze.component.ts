import { Component, Input, OnInit } from '@angular/core';
import {
  PackageRegistryService,
  DependencyTree
} from '../package-registry/package-registry.service';
import { tap, mergeMap } from 'rxjs/operators';
import { Dependency } from '../models/dependency.model';

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

    const depTree = this.packageRegistry
      .getDepTree(name, version)
      .pipe(
        tap(tree => {
          this.currentTreeScore = tree.getScore();

          // TODO: is it "good enough"? break the cycle somehow
        }),
        mergeMap(() => {
          this.state = 'findingAlternatives';

          return this.packageRegistry.search('something cool');
        }),
        tap(searchResults => {
          this.alternatives = searchResults;

          this.state = 'displayingAlternatives';
        })
      )
      .subscribe();
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
      if (dependencies[i].alternatives.length == 0) {
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
