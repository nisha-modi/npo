import { Component, OnInit } from '@angular/core';
import { FileHandle } from './dragDrop.directive';
import { Dependency } from './models/dependency.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appLogoUrl = 'assets/NPO.png';

  state: 'begin' | 'analyze' = 'begin';
  packageDependencies: { name: string; version: string }[];

  files: FileHandle[] = [];

  filesDropped(files: FileHandle[]): void {
    this.files = files;
  }

  upload(): void {
    // get image upload file obj;
  }

  ngOnInit() {
    // this will actually be done in response to the "upload" event
    this.state = 'analyze';
    this.packageDependencies = [
      { name: 'dragula', version: '^3.7.2' },
      { name: 'lodash', version: '^4.17.0' }
    ];
  }

  removeLowScoringDependencies(dependencies: Dependency[]) {
    for (let i = 0; i < dependencies.length; i++) {
      if (dependencies[i].dependencyScore <= 1) {
        dependencies.splice(i, 1);
      }
    }
    return dependencies;
  }

  removeWorseAlternatives(dependencies: Dependency[]) {
    for (let i = 0; i < dependencies.length; i++) {
      for (let j = 0; j < dependencies[i].alternatives.length; j++) {
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
}
