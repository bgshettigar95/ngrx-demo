import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { EmployeeService } from './employee.service';
import { Employee } from './models/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private employeeService:EmployeeService){
  }
  
@ViewChild('employeeTable') employeeTable:EmployeeTableComponent;
  showForm:boolean;
    ngOnInit(){
this.employeeService.showForm.subscribe(data=> this.showForm=data);
  }

  addEmp(){
    this.showForm=!this.showForm;
  }

  onUpdateClick(){
    this.showForm=!this.showForm;

  }

  onDeleteClick(){
    let selectedRows:Employee[] = this.employeeTable.getSelectedRows();
    if(selectedRows.length > 0){
      this.employeeService.deleteEmployees(selectedRows);
    }
   

  }

}
