package com.unitrade.service;

import com.unitrade.entity.Department;
import com.unitrade.repository.DepartmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepartmentService {

    private final DepartmentRepository departmentRepository;

    public DepartmentService(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }

    public List<Department> getDepartmentsByCollege(Long collegeId) {
        return departmentRepository.findByCollegeId(collegeId);
    }
}
