package com.unitrade.repository;

import com.unitrade.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DepartmentRepository extends JpaRepository<Department, Long> {

    // Fetch departments by college id
    List<Department> findByCollegeId(Long collegeId);
}
