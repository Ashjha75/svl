import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressIdentificationComponent } from './address-identification.component';

describe('AddressIdentificationComponent', () => {
  let component: AddressIdentificationComponent;
  let fixture: ComponentFixture<AddressIdentificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressIdentificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
