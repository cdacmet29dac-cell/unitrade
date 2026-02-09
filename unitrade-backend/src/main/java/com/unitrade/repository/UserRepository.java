package com.unitrade.repository;

import com.unitrade.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    // Find HOD by college and department
    Optional<User> findByRole_NameAndCollege_IdAndDepartment_Id(
            String roleName,
            Long collegeId,
            Long departmentId
    );
}
