import { Component, Input, OnInit } from '@angular/core';
import {
  PackageRegistryService,
  DependencyTree
} from '../package-registry/package-registry.service';
import { tap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-analyze',
  templateUrl: './analyze.component.html',
  styleUrls: ['./analyze.component.scss']
})
export class AnalyzeComponent implements OnInit {
  @Input() packageDependencies: { name: string; version: string }[];

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
          // TODO: populate the tree score of the dependency with that ^^^^

          // TODO: is it "good enough"? break the cycle somehow
        }),
        mergeMap(() =>
          this.packageRegistry.search(name).pipe(
            tap(results => {
              // populate the rest of the dependency infomration from the first result in results
            })
          )
        ),
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

  // TODO: Implement and put somewhere else, probably.
  private calcTreeScore(tree: DependencyTree) {
    return Math.random();
  }
}
