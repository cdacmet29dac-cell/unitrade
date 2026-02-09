package com.unitrade.repository;

import com.unitrade.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByRole_NameAndCollege_IdAndDepartment_Id(
            String role,
            Long collegeId,
            Long departmentId
    );
}