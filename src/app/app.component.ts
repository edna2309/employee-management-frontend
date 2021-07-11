import { EmployeeService } from './employee.service';
import { Component, OnInit } from '@angular/core';
import { Employee } from './Employee';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  public employees: Employee[] = [];
  public editEmployee: Employee | undefined;
  public deleteEmployee: Employee | undefined;

  public currentEmployee: Employee | undefined;

  constructor(private employeeService: EmployeeService){};

  ngOnInit(){
    this.getEmployees();
  }

  public getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) =>{
        this.employees = response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }
    );
  }

  public onAddEmployee(addForm: NgForm): void{
    document.getElementById('add-employee-form')?.click();
      this.employeeService.addEmployees(addForm.value).subscribe(
        (response: Employee) => {
          console.log(response);
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
      addForm.resetForm();
  }

  public onEditEmployee(employee: Employee): void{
      document.getElementById('add-employee-form')?.click();
      this.employeeService.updateEmployees(employee).subscribe(
        (response: Employee) => {
          console.log(response);
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
  }

  public onDeleteEmployee(employeeId: number | undefined): void{
    if(employeeId){
      this.employeeService.deleteEmployees(employeeId).subscribe(
        (response: void) => {
          console.log(response);
          this.getEmployees();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      );
    }
      
  }

  public searchEmployees(key: String): void{
    const results: Employee[] = [];
    for(const employee of this.employees){
      if(employee.name.toLowerCase().indexOf(key.toLowerCase()) !== -1){
        results.push(employee);
      }
    }
    this.employees=results;
    if(results.length==0 || !key){
      this.getEmployees();
    }
  }

  public onOpenModal(mode: string, employee?: Employee | null): void{
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display='none';
    button.setAttribute('data-toggle', 'modal');
    if(employee){
      this.currentEmployee=employee;
    }
    if(mode === 'add'){
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if(mode === 'edit'){   
      button.setAttribute('data-target', '#updateEmployeeModal');
    }
    if(mode === 'delete'){
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }
    container?.appendChild(button);
    button.click();
  }

}
