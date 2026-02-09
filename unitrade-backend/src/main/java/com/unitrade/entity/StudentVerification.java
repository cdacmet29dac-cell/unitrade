package com.unitrade.entity;

import com.unitrade.enums.UserStatus;
import jakarta.persistence.*;
import java.time.LocalDateTime;

/**
 * This entity represents the verification request
 * raised when a student registers.
 */
@Entity
@Table(name = "student_verifications")
public class StudentVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Student who is requesting approval
    @OneToOne
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    // HOD who will approve/reject
    @ManyToOne
    @JoinColumn(name = "hod_id")
    private User hod;

    // Path of uploaded ID card (later)
    private String idCardPath;

    // Approval status
    @Enumerated(EnumType.STRING)
    private UserStatus status = UserStatus.PENDING;

    // Optional remarks by HOD
    private String remarks;

    private LocalDateTime createdAt = LocalDateTime.now();

    // ---------- Getters & Setters ----------

    public Long getId() { return id; }

    public User getStudent() { return student; }
    public void setStudent(User student) { this.student = student; }

    public User getHod() { return hod; }
    public void setHod(User hod) { this.hod = hod; }

    public String getIdCardPath() { return idCardPath; }
    public void setIdCardPath(String idCardPath) { this.idCardPath = idCardPath; }

    public UserStatus getStatus() { return status; }
    public void setStatus(UserStatus status) { this.status = status; }

    public String getRemarks() { return remarks; }
    public void setRemarks(String remarks) { this.remarks = remarks; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}
