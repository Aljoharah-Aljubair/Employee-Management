import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../../services/department/department.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.css']
})
export class DepartmentAddComponent implements OnInit {
  departmentForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.departmentForm.valid) {
      const departmentData = this.departmentForm.value;

      this.departmentService.addDepartment(departmentData).subscribe({
        next: () => {
          alert("Department add sucssfuly");
          this.router.navigate(['/department']);
        },
        error: (error) => {
          alert(error.error.message);
        }
      });
    }
  }
}
