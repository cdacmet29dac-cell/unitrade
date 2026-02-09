package com.unitrade.controller;

import com.unitrade.entity.StudentVerification;
import com.unitrade.enums.UserStatus;
import com.unitrade.service.StudentVerificationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * APIs used by HOD to review and approve students.
 */
@RestController
@RequestMapping("/api/hod")
public class HodController {

    private final StudentVerificationService verificationService;

    public HodController(StudentVerificationService verificationService) {
        this.verificationService = verificationService;
    }

    /**
     * View all PENDING verification requests for a HOD
     * GET /api/hod/requests/{hodId}
     */
    @GetMapping("/requests/{hodId}")
    public List<StudentVerification> getPendingRequests(@PathVariable Long hodId) {
        return verificationService.getPendingRequests(hodId);
    }

    /**
     * Approve / Hold / Reject a student
     * POST /api/hod/verify/{verificationId}
     */
    @PostMapping("/verify/{verificationId}")
    public StudentVerification verifyStudent(
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
