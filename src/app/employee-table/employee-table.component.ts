import { Component, OnInit, ViewChild } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { EmployeeService } from '../employee.service';
import { Employee } from '../models/employee';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss']
})
export class EmployeeTableComponent implements OnInit {

  columnDefs = [
    { headerName: "Name", field: "name", sortable: true, filter: true, checkboxSelection: true },
    { headerName: "Email", field: "email", sortable: true, filter: true },
    { headerName: "Experience", field: "experience", sortable: true, filter: true },
    { headerName: "Contact No", field: "contactNo", sortable: true, filter: true },
    { headerName: "Skills", field: "skills", sortable: true, filter: true },
  ];

  rowData: Employee[];



  @ViewChild('agGrid') agGrid: AgGridAngular;
  constructor(public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data: Employee[]) => {
      console.log(data)
      this.rowData = data
    });

    console.log(this.rowData);
    
  }

  getSelectedRows() {
    return this.agGrid.api.getSelectedRows();
  }

  onRowSelected() {
    console.log("row sele");
    console.log(this.agGrid.api.getSelectedRows()[0]);

    this.employeeService.selectedEmployee.next(this.agGrid.api.getSelectedRows()[0]);
    this.employeeService.showForm.next(true);


  }

}
