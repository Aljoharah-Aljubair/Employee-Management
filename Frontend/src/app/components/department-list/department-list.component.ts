import { Component, OnInit } from '@angular/core';
import { DepartmentService } from '../../services/department/department.service';
import { DepartmentResponse } from '../../models/department.model';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  departments: DepartmentResponse[] = [];
  displayedColumns: string[] = ['name', 'location', 'actions'];
  totalDepartments = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(private departmentService: DepartmentService,private router: Router) { }

  ngOnInit(): void {
    this.loadDepartment(this.currentPage, this.pageSize);
  }

  loadDepartment(page: number, size: number) {
    this.departmentService.getDepartments(page, size).subscribe(response => {
      this.departments= response.content;
      this.totalDepartments = response.totalElements;
    });
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this department?')) {
      this.departmentService.deleteDepartment(id).subscribe(() => {
        this.loadDepartment(this.currentPage, this.pageSize);
      });
    }
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadDepartment(this.currentPage, this.pageSize);
  }

  onAdd() {
    this.router.navigate(['department/new']);  // This should navigate to the correct Add component
  }
  

}
