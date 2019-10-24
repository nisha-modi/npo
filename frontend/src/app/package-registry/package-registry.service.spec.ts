import { TestBed } from '@angular/core/testing';

import {
  PackageRegistryService,
  DependencyNode,
  DependencyTree
} from './package-registry.service';

describe('PackageRegistryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PackageRegistryService = TestBed.get(PackageRegistryService);
    expect(service).toBeTruthy();
  });
});

describe('DependencyTree', () => {
  it('calculates a score', () => {
    const tree = new DependencyTree(
      new DependencyNode('a', [
        new DependencyNode('a.a', []),
        new DependencyNode('a.b', [new DependencyNode('a.b.a', [])]),
        new DependencyNode('a.c', [
          new DependencyNode('a.c.a', [new DependencyNode('a.c.a.a', [])])
        ])
      ])
    );

    expect(tree.getScore()).toBe(1 * 3 * 2 * 1);
  });
});
