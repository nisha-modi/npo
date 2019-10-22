import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepTreeTempComponent } from './dep-tree-temp.component';

describe('DepTreeTempComponent', () => {
  let component: DepTreeTempComponent;
  let fixture: ComponentFixture<DepTreeTempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepTreeTempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepTreeTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
