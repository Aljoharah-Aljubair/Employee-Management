import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee/employee.service';
import { EmployeeResponse } from '../../models/employee.model';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: EmployeeResponse[] = [];
  displayedColumns: string[] = ['name', 'email', 'phoneNumber', 'departmentName', 'actions'];
  totalEmployees = 0;
  pageSize = 10;
  currentPage = 0;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.loadEmployees(this.currentPage, this.pageSize);
  }

  loadEmployees(page: number, size: number) {
    this.employeeService.getEmployees(page, size).subscribe(response => {
      this.employees = response.content;
      this.totalEmployees = response.totalElements;
    });
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployees(id).subscribe(() => {
        this.loadEmployees(this.currentPage, this.pageSize);
      });
    }
  }

  onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadEmployees(this.currentPage, this.pageSize);
  }
}
