package com.unitrade.controller;

import com.unitrade.entity.StudentVerification;
import com.unitrade.enums.UserStatus;
import com.unitrade.service.StudentVerificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Handles student verification related APIs.
 *
 * Used for:
 * 1. Fetching verification details for ID upload
 * 2. HOD dashboard (view pending students)
 * 3. HOD approving / holding / rejecting students
 */
@RestController
@RequestMapping("/api/verifications")
public class StudentVerificationController {

    private final StudentVerificationService verificationService;

    public StudentVerificationController(StudentVerificationService verificationService) {
        this.verificationService = verificationService;
    }

    /**
     * 🔹 Fetch verification details using student userId
     * Used by UploadId.jsx
     */
    @GetMapping("/user/{userId}")
    public StudentVerification getVerificationByUser(@PathVariable Long userId) {
        return verificationService.getVerificationByUser(userId);
    }

    /**
     * 🔹 Get all pending verification requests for a HOD
     * Used in HOD Dashboard
     */
    @GetMapping("/hod/{hodId}")
    public List<StudentVerification> getPendingForHod(@PathVariable Long hodId) {
        return verificationService.getPendingRequests(hodId);
    }

    /**
     * 🔹 HOD approves / holds / rejects a student
     */
    @PutMapping("/{verificationId}/status")
    public StudentVerification updateStatus(
            @PathVariable Long verificationId,
            @RequestParam UserStatus status,
            @RequestParam(required = false) String remarks) {

        return verificationService.updateStatus(
                verificationId,
                status,
                remarks
        );
    }
}