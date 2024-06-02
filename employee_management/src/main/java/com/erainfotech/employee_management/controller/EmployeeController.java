package com.erainfotech.employee_management.controller;

import com.erainfotech.employee_management.entity.Employee;
import com.erainfotech.employee_management.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    //get all employee api
    @GetMapping("/employees")
    public List<Employee> getAllEmployee (){
        return employeeRepository.findAll();
    }

    //
}
