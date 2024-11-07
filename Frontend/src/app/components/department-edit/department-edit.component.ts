import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DepartmentService } from '../../services/department/department.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DepartmentResponse } from '../../models/department.model';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.css']
})
export class DepartmentEditComponent implements OnInit {

  departmentForm!: FormGroup;
  departmentId!: number;
  errorMessage: string = ''; 

  constructor(
    private fb: FormBuilder,
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.departmentId = +this.route.snapshot.paramMap.get('id')!;
    this.loadDepartmentData();
    this.initializeForm();

  }

  initializeForm() {
    this.departmentForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required]
    });
  }

  loadDepartmentData() {
    this.departmentService.getDepartmentById(this.departmentId).subscribe(
      (data: DepartmentResponse) => {
        this.departmentForm.patchValue({
          name: data.name,
          location: data.location
        });
         console.log(this.departmentForm);  
      },
      (error) => {
        alert(error.error.message);
      }
    );
  }

  onSubmit() {
    if (this.departmentForm.valid) {
      const updatedDepartment = this.departmentForm.value;
      this.departmentService.updateDepartment(this.departmentId, updatedDepartment).subscribe(
        (res) => {
          alert("The department updated succsesfuly");
          this.router.navigate(['/department']);
        },
        (error) => {
          alert(error.error.message);
        })
    };
  }

}


