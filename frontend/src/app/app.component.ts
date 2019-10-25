import { Component, OnInit } from '@angular/core';
import { Dependency } from './models/dependency.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appLogoUrl = 'assets/NPO.png';

  state: 'begin' | 'analyze' = 'begin';

  packageDependencies: Dependency[];

  ngOnInit() {}

  handleDependenciesFound(dependencies: Map<string, string>) {
    this.packageDependencies = Object.keys(dependencies).map(name => {
      return new Dependency(name, dependencies[name]);
    });
    this.state = 'analyze';
  }
}
