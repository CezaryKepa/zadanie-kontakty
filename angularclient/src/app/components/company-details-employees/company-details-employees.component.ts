import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Company} from "../contact-add-company/model/Company";
import {Subscription} from "rxjs";
import {CompanyService} from "../service/company.service";
import {ActivatedRoute} from "@angular/router";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Employee} from "../contact-add-company/model/Employee";


@Component({
  selector: 'ngbd-modal-content',
  template: `
      <div class="modal-header">
          <h2 class="modal-title">Dane pracownika</h2>
          <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
              <span aria-hidden="true">&times;</span>
          </button>
      </div>
      <div class="modal-body">
        <div class="form-group">
            <label for="name">Imię</label>
            <input type="text" class="form-control"  id="name" [(ngModel)]="employee.name" name="name">
        </div>
        <div class="form-group">
            <label for="surname">Nazwisko*</label>
            <input type="text" class="form-control"  id="surname" [(ngModel)]="employee.surname" name="surname" required>
        </div>
        <div class="form-group">
            <label for="name">Stanowisko</label>
            <input type="text" class="form-control"  id="position" [(ngModel)]="employee.position" name="position">
        </div>
        <div class="form-group">
            <label for="name">Telefon</label>
            <input type="text" class="form-control"  id="phone" [(ngModel)]="employee.phone" name="phone">
        </div>
      </div>
    <div class="modal-footer">
        <button  type="submit" class="btn btn-primary" (click)="passBack()">Zapisz</button>
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Anuluj</button>
    </div>
  `
})
export class NgbdModalContent {
  @Input() employee;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {
  }

  passBack() {
    this.activeModal.close('Close click');
    this.passEntry.emit(this.employee);
  }
}


@Component({
  selector: 'ngbd-modal-content2',
  template: `
      <div class="modal-header">
          
          <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
              <span aria-hidden="true">&times;</span>
          </button>
      </div>
      <div class="modal-body">
          <p>Kliknij przycisk Tak aby zmienić wartość statusu na przeciwną.

              Czy zatwierdzić zmianę?</p>
      </div>
      <div class="modal-footer">
        
      <button type="button" class="btn btn-outline-dark" (click)="activeModal.close('Close click')">Anuluj</button>
          <button  type="submit" class="btn btn-primary" (click)="passBack()">Tak</button>
    </div>
  `
})
export class NgbdModalContent2 {
  @Input() employee;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  constructor(public activeModal: NgbActiveModal) {
  }

  passBack() {
    this.employee.status = this.employee.status !== true;
    this.activeModal.close('Close click');
    this.passEntry.emit(this.employee);
  }
}

@Component({
  selector: 'app-company-details-employees',
  templateUrl: './company-details-employees.component.html',
  styleUrls: ['./company-details-employees.component.css']
})

export class CompanyDetailsEmployeesComponent implements OnInit {

  company:Company;
  id:number;
  sub:Subscription;

  constructor(private companyService: CompanyService, private route: ActivatedRoute, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.getCompany(this.id);
  }

  getCompany(id: number): void{
    this.companyService.get(id).subscribe(data =>{
      this.company=data;
    });
  }

  open(id: string) {
    const modalRef = this.modalService.open(NgbdModalContent);
    console.log(id);
    modalRef.componentInstance.employee = this.company.employees.find(e=>e.id===id);
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.updateEmployee(receivedEntry);
    })
  }

  openAdd() {
    const modalRef = this.modalService.open(NgbdModalContent);

    modalRef.componentInstance.employee = new Employee();
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.addEmployee(receivedEntry);
    })
  }

  openStatus(id: string) {
    const modalRef = this.modalService.open(NgbdModalContent2);
    console.log(id);
    modalRef.componentInstance.employee = this.company.employees.find(e=>e.id===id);
    modalRef.componentInstance.passEntry.subscribe((receivedEntry) => {
      this.updateEmployee(receivedEntry);
    })
  }

  updateEmployee(employee:Employee){
    this.companyService
      .updateEmployee(employee,this.company.id)
      .subscribe(()=> {
        this.getCompany(this.id);
      })
  }

  deleteEmployee(employee:Employee): void{
    this.companyService
      .deleteEmployee(Number(employee.id))
      .subscribe(()=> {
        this.getCompany(this.id);
      })
  }

  private addEmployee(employee:Employee) {
    this.companyService
      .addEmployee(employee,this.company.id)
      .subscribe(()=> {
        this.getCompany(this.id);
      })
  }
}
