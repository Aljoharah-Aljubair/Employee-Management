package com.employeemanagement.service;

import com.employeemanagement.api.v1.request.EmployeeRequest;
import com.employeemanagement.api.v1.response.EmployeeResponse;
import com.employeemanagement.api.v1.response.PageResponse;
import com.employeemanagement.domain.Department;
import com.employeemanagement.domain.Employee;
import com.employeemanagement.repository.DepartmentRepository;
import com.employeemanagement.repository.EmployeeRepository;
import jakarta.persistence.EntityNotFoundException;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
    private final EmployeeRepository employeeRepository;
    private final DepartmentRepository departmentRepository;
    private final ModelMapper modelMapper;

    public EmployeeService(EmployeeRepository employeeRepository, DepartmentRepository departmentRepository, ModelMapper modelMapper) {
        this.employeeRepository = employeeRepository;
        this.departmentRepository = departmentRepository;
        this.modelMapper = modelMapper;
    }

    public EmployeeResponse createEmployee(EmployeeRequest employeeRequest) {
        Employee employee = modelMapper.map(employeeRequest, Employee.class);

        Department department = departmentRepository.findByName(employeeRequest.getDepartmentName())
                .orElseThrow(() -> new EntityNotFoundException("Department not found with name: " + employeeRequest.getDepartmentName()));

        employee.setDepartment(department);
        Employee savedEmployee = employeeRepository.save(employee);
        return modelMapper.map(savedEmployee, EmployeeResponse.class);
    }

    public EmployeeResponse getEmployeeById(Integer id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found"));
        return modelMapper.map(employee, EmployeeResponse.class);
    }

    public PageResponse<EmployeeResponse> getAllEmployees(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Employee> employeePage = employeeRepository.findAll(pageable);
        List<EmployeeResponse> employeeResponses = employeePage.stream()
                .map(employee -> modelMapper.map(employee, EmployeeResponse.class))
                .collect(Collectors.toList());
        return new PageResponse<>(
                employeeResponses,
                employeePage.getNumber(),  
                employeePage.getTotalPages(), 
                employeePage.getTotalElements(), 
                employeePage.getSize() 
        );
    }


    public EmployeeResponse updateEmployee(Integer id, EmployeeRequest employeeRequest) {
        Employee existingEmployee = employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found"));
        Department department = departmentRepository.findByName(employeeRequest.getDepartmentName())
                .orElseThrow(() -> new EntityNotFoundException("Department not found with name: " + employeeRequest.getDepartmentName()));
        modelMapper.map(employeeRequest, existingEmployee);
        existingEmployee.setDepartment(department);
        Employee updatedEmployee = employeeRepository.save(existingEmployee);
        return modelMapper.map(updatedEmployee, EmployeeResponse.class);
    }

    public EmployeeResponse deleteEmployee(Integer id) {
        Employee employee = employeeRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Employee not found"));
        employeeRepository.delete(employee);
        return  modelMapper.map(employee, EmployeeResponse.class);
    }
}
