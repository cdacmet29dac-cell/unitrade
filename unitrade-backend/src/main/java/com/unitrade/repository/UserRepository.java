package com.unitrade.repository;

import com.unitrade.entity.User;
import com.unitrade.enums.UserStatus;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByRole_NameAndCollege_IdAndDepartment_Id(
            String role,
            Long collegeId,
            Long departmentId
    );
    
 // All HODs with specific status
    List<User> findByRole_NameAndStatus(String roleName, UserStatus status);
}