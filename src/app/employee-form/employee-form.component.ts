import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  experience = ["Fresher", "Experienced"];
  employeeForm: FormGroup;
  constructor(private employeeService:EmployeeService) { }

  ngOnInit(): void {


    this.employeeForm = new FormGroup({
      'id':new FormControl(null),
      'firstName': new FormControl(null,Validators.required),
      'lastName': new FormControl(null,Validators.required),
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'experience': new FormControl(null,Validators.required),
      'experienceYears': new FormControl(null,Validators.required),
      'contactNo': new FormControl(null,Validators.required),
      'skills':new FormArray([])

    });

    this.employeeService.selectedEmployee.subscribe(data =>{
      console.log(data);
      
    this.employeeForm.patchValue({
      'id':data.id,
      'email':data.email,
      'firstName':data.name.split(' ')[0],
      'lastName':data.name.split(' ')[1],
      'experience':data.experience.split(' ')[0],
      'experienceYears':data.experience.split(' ')[1],
      'contactNo':data.contactNo,
      'skills':data.skills.split(',')

    })
     
    });

    
  }

  addSkill(){
    const control = new FormControl(null,Validators.required);
    // console.log(control);
    (<FormArray>this.employeeForm.get('skills')).push(control);
  }

  getSkills(){
    return (this.employeeForm.get('skills') as FormArray).controls;
    
  }

  getSkillsValue(){
  //  console.log( (this.employeeForm.get('skills') as FormArray).value);
   
  }

  onSubmit(){
    let data= {
      id:this.employeeForm.value.id,
      name: this.employeeForm.value.firstName +' '+this.employeeForm.value.lastName,
      email:this.employeeForm.value.email,
      experience:this.employeeForm.value.experience + ' '+ this.employeeForm.value.experienceYears,
      contactNo:this.employeeForm.value.contactNo,
      skills:this.employeeForm.value.skills.join()
    }
    // console.log(data);
    
   this.employeeService.addEmployee(data);
  }

  onReset(){
    this.employeeForm.reset();
  }

}
