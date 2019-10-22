import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DependencyScoreComponent } from './dependency-score.component';

describe('DependencyScoreComponent', () => {
  let component: DependencyScoreComponent;
  let fixture: ComponentFixture<DependencyScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DependencyScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DependencyScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
