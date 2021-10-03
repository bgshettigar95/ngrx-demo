import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from './models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  rowData: Employee[] = [
    { id: 1, name: "Aaa", email: "aswqfqwf@sssv", experience: '26', contactNo: 8458356812, skills: "angular" },
    { id: 2, name: "bbb", email: "bbb@sssv", experience: '26', contactNo: 8458356812, skills: "angular" },
    { id: 3, name: "ccc", email: "ccc@sssv", experience: '26', contactNo: 8458356812, skills: "angular,React" },
  ];


  url = 'http://localhost:8080/employees';

  // rowData: Employee[] =[];

  employeeData = new Subject();

  showForm = new BehaviorSubject(false);

  selectedEmployee = new Subject<Employee>();


  getEmployees() {
   return this.http.get<Employee[]>(this.url);
  }

  addEmployee(employee: any) {

    let employeeData;
    console.log(employee);

    console.log(this.rowData.filter(item => item.id == employee.id));


    if (!(this.rowData.filter(item => item.id == employee.id).length > 0)) {
      employeeData = {
        ...employee,
        id: this.rowData.length + 1
      }
      this.rowData.push(employeeData);

      console.log(employeeData);
    } else {

      console.log('else');

      this.rowData = this.rowData.map(item => {
        if (item.id == employee.id) {
          item.name = employee.name,
            item.email = employee.email,
            item.experience = employee.experience,
            item.contactNo = employee.contactNo,
            item.skills = employee.skills

        }

        return item
      })
    }



    this.employeeData.next(this.rowData);

  }

  deleteEmployees(employee: Employee[]) {

    this.rowData = this.rowData.filter(item => employee.every(emp => emp.id != item.id));


    this.employeeData.next(this.rowData);

  }




}
