import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  appLogoUrl = 'assets/NPO.png';

  state: 'begin' | 'analyze' = 'begin';
  packageDependencies: { name: string; version: string }[];

  ngOnInit() {
    // this will actually be done in response to the "upload" event
    this.state = 'analyze';
    this.packageDependencies = [
      { name: 'dragula', version: '^3.7.2' },
      { name: 'lodash', version: '^4.17.0' }
    ];
  }
}
