import { environment as env } from 'src/environments/environment';

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { PackageRegistryService } from '../package-registry/package-registry.service';

@Component({
  selector: 'app-dep-tree-temp',
  templateUrl: './dep-tree-temp.component.html',
  styleUrls: ['./dep-tree-temp.component.scss']
})
export class DepTreeTempComponent implements OnInit {
  deps$: Observable<any[]> = this.http.get<any[]>(
    `${env.api}/tree?name=libnpm`
  );

  constructor(
    private http: HttpClient,
    private packageRegistry: PackageRegistryService
  ) {}

  ngOnInit() {
    this.deps$.subscribe(res => {
      console.log(res);
    });

    this.packageRegistry.search('karma-viewport').subscribe(res => {
      console.log(res);
    });

    this.packageRegistry.getDepTree('karma-viewport').subscribe(res => {
      console.log(res);
    });
  }
}
