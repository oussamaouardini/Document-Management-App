import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { USERSComponent } from './users.component';

describe('USERSComponent', () => {
  let component: USERSComponent;
  let fixture: ComponentFixture<USERSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ USERSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(USERSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
