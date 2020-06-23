import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyDetailsEmployeesComponent } from './company-details-employees.component';

describe('CompanyDetailsEmployeesComponent', () => {
  let component: CompanyDetailsEmployeesComponent;
  let fixture: ComponentFixture<CompanyDetailsEmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyDetailsEmployeesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyDetailsEmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
