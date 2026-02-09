package com.unitrade.repository;

import com.unitrade.entity.StudentVerification;
import com.unitrade.enums.UserStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * Repository for Student Verification requests.
 */
public interface StudentVerificationRepository
        extends JpaRepository<StudentVerification, Long> {

    /**
     * Fetch verification requests for a HOD by status.
     */
    List<StudentVerification> findByHodIdAndStatus(Long hodId, UserStatus status);
    
    Optional<StudentVerification> findByStudent_Id(Long studentId);
}
