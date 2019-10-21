import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Node Package Optimizer';

  funcResponse$ = this.http.get(`${env.api}/Ping?name=world`, { responseType: 'text' });

  constructor(private http: HttpClient) {}
}
