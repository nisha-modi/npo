import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NpoNameComponent } from './npo-name.component';

describe('NpoNameComponent', () => {
  let component: NpoNameComponent;
  let fixture: ComponentFixture<NpoNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NpoNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NpoNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
