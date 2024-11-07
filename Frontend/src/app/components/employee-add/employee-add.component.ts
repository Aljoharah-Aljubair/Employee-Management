import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../../services/employee/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      departmentName: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;

      this.employeeService.addEmployees(employeeData).subscribe({
        next: () => {
          alert("Employee add sucssfuly");
          this.router.navigate(['/employees']);
        },
        error: (error) => {
          alert(error.error.message);
        }
      });
    }
  }
}
