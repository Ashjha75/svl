import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewRegisterationComponent } from './review-registeration.component';

describe('ReviewRegisterationComponent', () => {
  let component: ReviewRegisterationComponent;
  let fixture: ComponentFixture<ReviewRegisterationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewRegisterationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewRegisterationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
