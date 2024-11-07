import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DepartmentAddComponent } from './components/department-add/department-add.component';
import { DepartmentEditComponent } from './components/department-edit/department-edit.component';

const routes: Routes = [
  { path: 'employees', component: EmployeeListComponent },
  { path: 'employees/new', component: EmployeeAddComponent },
  { path: 'employees/:id', component: EmployeeEditComponent },
  { path: 'department', component: DepartmentListComponent },
  { path: 'department/new', component: DepartmentAddComponent },  
  { path: 'department/:id', component: DepartmentEditComponent },
  { path: '', component: EmployeeListComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
