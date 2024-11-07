package com.employeemanagement.api.v1.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeResponse {
    private Long id;
    private String name;
    private String email;
    private String phoneNumber;
    private String departmentName;

}
