import { TestBed } from '@angular/core/testing';

import { PackageRegistryService } from './package-registry.service';

describe('PackageRegistryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PackageRegistryService = TestBed.get(PackageRegistryService);
    expect(service).toBeTruthy();
  });
});
