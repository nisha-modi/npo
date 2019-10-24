import { Component, OnInit } from '@angular/core';
import { Dependency } from './models/dependency.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appLogoUrl = 'assets/NPO.png';
  testAlternatives: Dependency[] = [
    new Dependency(
      'alternative 1',
      'version',
      'description',
      5,
      5,
      5,
      5,
      5,
      '95%',
      []
    ),
    new Dependency(
      'alternative 2',
      'version',
      'description',
      5,
      5,
      5,
      5,
      5,
      '95%',
      []
    ),
    new Dependency(
      'alternative 3',
      'version',
      'description',
      5,
      5,
      5,
      5,
      5,
      '95%',
      []
    )
  ];

  state: 'begin' | 'analyze' = 'begin';

  packageDependencies: Dependency[] = [
    new Dependency(
      'Dependency 1',
      'version',
      'description',
      5,
      5,
      5,
      5,
      5,
      '95%',
      this.testAlternatives
    ),
    new Dependency(
      'Dependency 2',
      'version',
      'description',
      5,
      5,
      5,
      5,
      5,
      '95%',
      this.testAlternatives
    )
  ];

  ngOnInit() {}

  handleDependenciesFound(dependencies: Map<string, string>) {
    this.packageDependencies = Object.keys(dependencies).map(name => {
      return new Dependency(name, dependencies[name]);
    });
    this.state = 'analyze';
  }
}
