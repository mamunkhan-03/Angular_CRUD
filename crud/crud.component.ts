import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms'
import { EmployeeModel } from './crud.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  formValue !: FormGroup;

  employeeModelObj: EmployeeModel=new EmployeeModel();

  employeeData !:any;

  showAdd !: boolean;
  showUpdate !: boolean;
  
  constructor(private formbuilder : FormBuilder,
    private api:ApiService,
  ) { }

  ngOnInit(): void {
    this.formValue=this.formbuilder.group({
     id:[],
      empId: [],
      empName: [''],
      empMobile: [''],
      empSalary: []
      

    })

    this.getAllEmployee();

}

clickAddEmployee(){
  this.formValue.reset();
  this.showAdd=true;
  this.showUpdate=false;
}


postEmployeeDetails (){
  this.employeeModelObj.id=this.formValue.value.id;
  this.employeeModelObj.empId=this.formValue.value.empId;
  this.employeeModelObj.empName=this.formValue.value.empName;
  this.employeeModelObj.empMobile=this.formValue.value.empMobile;
  this.employeeModelObj.empSalary=this.formValue.value.empSalary;

//   this.api.postEmployee(this.employeeModelObj)
//   .subscribe(res=>{
//     console.log(res);
//     alert("Employee Added Successfully");
//   }, 
// err=>{
//   alert("Something went wrong");
// })


this.api.postEmployee(this.employeeModelObj)
  .subscribe({
    next: res => {
      console.log(res);
      alert("Employee Added Successfully");
      let ref=document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    },
    error: err => {
      alert("Something went wrong");
    },
    complete: () => {
      console.log("Request complete");
    }
  })

}

getAllEmployee(){
  this.api.getEmployee()
    .subscribe(res=>{
      this.employeeData=res;
    })
  
}

deleteEmployee ( row: any){
  this.api.deleteEmployee(row.id)
  .subscribe(res =>{
    alert("Employee Deleetd !")
    this.getAllEmployee();
  })

}

onEdit(row: any){

  this.showAdd=false;
  this.showUpdate=true;
  this.employeeModelObj.id=row.id;
  this.formValue.controls['id'].setValue(row.id)
  this.formValue.controls['empId'].setValue(row.empId)
  this.formValue.controls['empName'].setValue(row.empName)
  this.formValue.controls['empMobile'].setValue(row.empMobile)
  this.formValue.controls['empSalary'].setValue(row.empSalary)
  

}

UpdateEmployeeDetails () {

  this.employeeModelObj.id=this.formValue.value.id;
  this.employeeModelObj.empId=this.formValue.value.empId;
  this.employeeModelObj.empName=this.formValue.value.empName;
  this.employeeModelObj.empMobile=this.formValue.value.empMobile;
  this.employeeModelObj.empSalary=this.formValue.value.empSalary;

  this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)

  .subscribe(res=>{
    alert("Updated Successfully");

    let ref=document.getElementById("cancel")
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
  })

}

}