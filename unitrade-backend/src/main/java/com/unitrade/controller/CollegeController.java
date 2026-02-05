package com.unitrade.controller;

import com.unitrade.entity.College;
import com.unitrade.entity.Department;
import com.unitrade.service.CollegeService;
import com.unitrade.service.DepartmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * APIs for College & Department master data.
 * Used in registration dropdowns.
 */
@RestController
@RequestMapping("/api/colleges")
public class CollegeController {

    private final CollegeService collegeService;
    private final DepartmentService departmentService;

    public CollegeController(CollegeService collegeService,
                             DepartmentService departmentService) {
        this.collegeService = collegeService;
        this.departmentService = departmentService;
    }

    /**
     * Get all colleges
     * GET /api/colleges
     */
    @GetMapping
    public List<College> getAllColleges() {
        return collegeService.getAllColleges();
    }

    /**
     * Get departments by college
     * GET /api/colleges/{id}/departments
     */
    @GetMapping("/{id}/departments")
    public List<Department> getDepartments(@PathVariable Long id) {
        return departmentService.getDepartmentsByCollege(id);
    }
}
