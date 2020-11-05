import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChosefileComponent } from './chosefile.component';

describe('ChosefileComponent', () => {
  let component: ChosefileComponent;
  let fixture: ComponentFixture<ChosefileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChosefileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChosefileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
