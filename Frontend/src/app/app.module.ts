import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; 
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import {MatStepperModule} from '@angular/material/stepper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MaterialModule } from './material.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { DepartmentAddComponent } from './components/department-add/department-add.component';
import { DepartmentListComponent } from './components/department-list/department-list.component';
import { DepartmentEditComponent } from './components/department-edit/department-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    EmployeeAddComponent,
    EmployeeEditComponent,
    HeaderComponent,
    DepartmentAddComponent,
    DepartmentListComponent,
    DepartmentEditComponent
  ],
  imports: [
    AppRoutingModule,
    MaterialModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatPaginatorModule,
    HttpClientModule ,
    BrowserModule,
    FormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule.forRoot([]) , // Ensure router is properly initialized
    ReactiveFormsModule ,
    MatSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
