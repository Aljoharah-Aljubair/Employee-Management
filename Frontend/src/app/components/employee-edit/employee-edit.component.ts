import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../services/employee/employee.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeResponse } from '../../models/employee.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { info } from 'console';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  employeeForm!: FormGroup;
  employeeId!: number;
  errorMessage: string = ''; // To store the error message

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.employeeId = +this.route.snapshot.paramMap.get('id')!;
    this.initializeForm();
    this.loadEmployeeData();
  }

  initializeForm() {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      departmentName: ['', Validators.required]
    });
  }

  loadEmployeeData() {
    this.employeeService.getEmployeesById(this.employeeId).subscribe(
      (data: EmployeeResponse) => {
        this.employeeForm.patchValue({
          name: data.name,
          email: data.email,
          phoneNumber: data.phoneNumber,
          departmentName: data.departmentName
        });
      },
      (error) => {
        alert(error.error.message);
      }
    );
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const updatedEmployee = this.employeeForm.value;
      this.employeeService.updateEmployees(this.employeeId, updatedEmployee).subscribe(
        (res) => {
          alert("The employee updated succsesfuly");
          this.router.navigate(['/employees']);
        },
        (error) => {
          alert(error.error.message);
        })
    };
  }

}

