package com.unitrade.service;

import com.unitrade.entity.StudentVerification;
import com.unitrade.entity.User;
import com.unitrade.enums.UserStatus;
import com.unitrade.repository.StudentVerificationRepository;
import com.unitrade.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Handles student verification and HOD approval logic.
 */
@Service
public class StudentVerificationService {

    private final StudentVerificationRepository verificationRepository;
    private final UserRepository userRepository;
    private final NotificationService notificationService;

    public StudentVerificationService(StudentVerificationRepository verificationRepository,
                                      UserRepository userRepository,
                                      NotificationService notificationService) {
        this.verificationRepository = verificationRepository;
        this.userRepository = userRepository;
        this.notificationService = notificationService;
    }

    /**
     * Create verification request when student registers.
     */
    public StudentVerification createRequest(User student, User hod) {

        StudentVerification verification = new StudentVerification();
        verification.setStudent(student);
        verification.setHod(hod);
        verification.setStatus(UserStatus.PENDING);

        return verificationRepository.save(verification);
    }

    /**
     * Get all pending verification requests for a HOD.
     */
    public List<StudentVerification> getPendingRequests(Long hodId) {
        return verificationRepository.findByHodIdAndStatus(
                hodId, UserStatus.PENDING
        );
    }

    /**
     * 🔹 Fetch verification using student userId
     * Used during ID upload
     */
    public StudentVerification getVerificationByUser(Long userId) {
        return verificationRepository.findByStudent_Id(userId)
                .orElseThrow(() ->
                        new RuntimeException("Verification not found for user"));
    }

    /**
     * Approve / Hold / Reject a student and notify via WhatsApp.
     */
    @Transactional
    public StudentVerification updateStatus(Long verificationId,
                                            UserStatus status,
                                            String remarks) {

        StudentVerification verification =
                verificationRepository.findById(verificationId)
                        .orElseThrow(() -> new RuntimeException("Verification request not found"));

        // Update verification
        verification.setStatus(status);
        verification.setRemarks(remarks);

        // Update student status
        User student = verification.getStudent();
        student.setStatus(status);
        userRepository.save(student);

        // 🔔 WhatsApp notification
        String message = buildMessage(student.getName(), status, remarks);

        System.out.println("🔔 Sending WhatsApp to: " + student.getPhone());
        notificationService.sendWhatsApp(
                student.getPhone(),
                message
        );

        return verificationRepository.save(verification);
    }

    /**
     * Build WhatsApp message based on status.
     */
    private String buildMessage(String name, UserStatus status, String remarks) {

        switch (status) {

            case APPROVED:
                return "Hello " + name +
                        ", your registration has been APPROVED. You can now access UniTrade.";

            case HOLD:
                return "Hello " + name +
                        ", your registration is on HOLD."
                        + (remarks != null ? " Remarks: " + remarks : "");

            case REJECTED:
                return "Hello " + name +
                        ", your registration has been REJECTED."
                        + (remarks != null ? " Remarks: " + remarks : "");

            default:
                return "";
        }
    }
}