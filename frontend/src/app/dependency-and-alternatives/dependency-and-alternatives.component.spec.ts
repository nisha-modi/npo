import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyAndAlternativesComponent } from './dependency-and-alternatives.component';

describe('DependencyAndAlternativesComponent', () => {
  let component: DependencyAndAlternativesComponent;
  let fixture: ComponentFixture<DependencyAndAlternativesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependencyAndAlternativesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyAndAlternativesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
