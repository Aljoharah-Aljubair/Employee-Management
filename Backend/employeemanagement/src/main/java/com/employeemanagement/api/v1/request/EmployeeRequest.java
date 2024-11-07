package com.employeemanagement.api.v1.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeRequest {
    private String name;
    private String email;
    private String phoneNumber;
    private String departmentName;
}
