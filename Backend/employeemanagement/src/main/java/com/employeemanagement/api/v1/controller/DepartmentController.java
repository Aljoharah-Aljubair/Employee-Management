package com.employeemanagement.api.v1.controller;

import com.employeemanagement.api.v1.request.DepartmentRequest;
import com.employeemanagement.api.v1.response.DepartmentResponse;
import com.employeemanagement.api.v1.response.EmployeeResponse;
import com.employeemanagement.api.v1.response.PageResponse;
import com.employeemanagement.service.DepartmentService;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
@RequestMapping("/departments")
public class DepartmentController {
    private final DepartmentService departmentService;

    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @PostMapping
    public ResponseEntity<DepartmentResponse> createDepartment(@RequestBody DepartmentRequest departmentRequest) {
        return ResponseEntity.ok(departmentService.createDepartment(departmentRequest));
    }

    @GetMapping("/{id}")
    public ResponseEntity<DepartmentResponse> getDepartmentById(@PathVariable Integer id) {
        return ResponseEntity.ok(departmentService.getDepartmentById(id));
    }

    @GetMapping
    public ResponseEntity<PageResponse<DepartmentResponse>> getAllDepartments(@RequestParam(defaultValue = "0") int page,
                                                                              @RequestParam(defaultValue = "10") int size) {
        PageResponse<DepartmentResponse> response = departmentService.getAllDepartments(page, size);
        return ResponseEntity.ok(response);
    }
    @PutMapping("/{id}")
    public ResponseEntity<DepartmentResponse> updateDepartment(@PathVariable Integer id,
                                                               @RequestBody DepartmentRequest departmentRequest) {
        return ResponseEntity.ok(departmentService.updateDepartment(id, departmentRequest));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<DepartmentResponse> deleteDepartment(@PathVariable Integer id) {
        return ResponseEntity.ok(departmentService.deleteDepartment(id));
    }
}
