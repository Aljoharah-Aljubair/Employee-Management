package com.employeemanagement.api.v1.request;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DepartmentRequest {
    private String name;
    private String location;
}
