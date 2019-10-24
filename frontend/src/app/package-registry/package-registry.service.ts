import { environment as env } from 'src/environments/environment';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, forkJoin } from 'rxjs';
import { map, mergeMap, shareReplay } from 'rxjs/operators';

interface NpmPackage {
  name: string;
  description: string;
  dependencies: Map<string, string>; // { packageName: version }
  devDependencies: Map<string, string>; // { packageName: version }
}

export class DependencyTree {
  constructor(public root: DependencyNode) {}

  getScore() {
    const levelScores = [];

    const toVisit = [{ level: 1, node: this.root }];

    while (toVisit.length) {
      const next = toVisit.pop();

      levelScores[next.level] = (levelScores[next.level] || 0) + 1;

      next.node.dependencies.forEach(node => {
        toVisit.push({ level: next.level + 1, node });
      });
    }

    return levelScores.reduce(
      (acc, levelCount, idx) => acc + levelCount * (idx + 1)
    );
  }
}

export class DependencyNode {
  // TODO: should we populate dev/peer dependencies?

  constructor(public name: string, public dependencies: DependencyNode[]) {}
}

@Injectable({
  providedIn: 'root'
})
export class PackageRegistryService {
  private cache: Record<string, Observable<DependencyNode>> = {};

  constructor(private http: HttpClient) {}

  getDepTree(name: string, version = 'latest'): Observable<DependencyTree> {
    // this endpoint will return the entire tree from the server
    // return this.http.get<DependencyTree>(`${env.api}/tree?name=${name}`);

    // this method does one dependency at a time and builds the tree in the browser
    return this.getDepNode(name, version).pipe(
      map(root => new DependencyTree(root))
    );
  }

  getDepNode(name: string, version = 'latest'): Observable<DependencyNode> {
    if (!this.cache[name]) {
      this.cache[name] = this.getNpmPackage(name, version).pipe(
        mergeMap(npmPackage => {
          const { dependencies } = npmPackage;

          const dependencies$: Observable<DependencyNode>[] = [];

          if (dependencies) {
            for (const depName of Object.keys(dependencies)) {
              const depVersion = 'latest'; // TODO: dependencies[depName];

              dependencies$.push(this.getDepNode(depName, depVersion));
            }
          }

          return forkJoin([of(npmPackage), ...dependencies$]);
        }),
        map(([parent, ...children]) => {
          // TODO: figure out how to make typescript know the actual type of children
          return new DependencyNode(parent.name, children);
        }),
        shareReplay(1)
      );
    } else {
      console.log('Woo, cache hit');
    }
    return this.cache[name];
  }

  getNpmPackage(name: string, version = 'latest'): Observable<NpmPackage> {
    // call direct to the registry, doesn't yet handle scoped packages, checkout
    // our proxy for the workaround.
    // return this.http.get<NpmPackage>(`https://registry.npmjs.cf/${name}/${version}`);

    // call our proxy
    return this.http.get<NpmPackage>(
      `${env.api}/package?name=${name}&version=${version}`
    );
  }

  // TODO: add a type for the search result (see libnpmsearch)
  search(text: string): Observable<any> {
    return this.http.get<any>(`${env.api}/package-search?text=${text}`);
  }
}
