package com.employeemanagement.service;

import com.employeemanagement.api.v1.request.DepartmentRequest;
import com.employeemanagement.api.v1.response.DepartmentResponse;
import com.employeemanagement.api.v1.response.PageResponse;
import com.employeemanagement.domain.Department;
import com.employeemanagement.repository.DepartmentRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DepartmentService {
    private final DepartmentRepository departmentRepository;
    private final ModelMapper modelMapper;

    public DepartmentService(DepartmentRepository departmentRepository, ModelMapper modelMapper) {
        this.departmentRepository = departmentRepository;
        this.modelMapper = modelMapper;
    }

    public DepartmentResponse createDepartment(DepartmentRequest departmentRequest) {
        Department department = modelMapper.map(departmentRequest, Department.class);
        Department savedDepartment = departmentRepository.save(department);
        return modelMapper.map(savedDepartment, DepartmentResponse.class);
    }

    public DepartmentResponse getDepartmentById(Integer id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Department not found"));
        return modelMapper.map(department, DepartmentResponse.class);
    }


    public DepartmentResponse updateDepartment(Integer id, DepartmentRequest departmentRequest) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Department not found"));

        modelMapper.map(departmentRequest, department);
        Department updatedDepartment = departmentRepository.save(department);
        return modelMapper.map(updatedDepartment, DepartmentResponse.class);
    }

    public DepartmentResponse deleteDepartment(Integer id) {
        Department department = departmentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Department not found"));
        departmentRepository.delete(department);
       return  modelMapper.map(department, DepartmentResponse.class);
    }

    public PageResponse<DepartmentResponse> getAllDepartments(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Department> departmentPage = departmentRepository.findAll(pageable);
        List<DepartmentResponse> departmentResponses = departmentPage.stream()
                .map(department -> modelMapper.map(department, DepartmentResponse.class))
                .collect(Collectors.toList());
        return new PageResponse<>(
                departmentResponses,
                departmentPage.getNumber(), 
                departmentPage.getTotalPages(), 
                departmentPage.getTotalElements(),
                departmentPage.getSize()
        );
    }

}
