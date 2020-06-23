import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAddCompanyComponent } from './contact-add-company.component';

describe('ContactAddCompanyComponent', () => {
  let component: ContactAddCompanyComponent;
  let fixture: ComponentFixture<ContactAddCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactAddCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAddCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
