package com.unitrade.dto;

public class RegisterResponse {

    private Long userId;
    private Long verificationId;
    private String status;

    public RegisterResponse(Long userId, Long verificationId, String status) {
        this.userId = userId;
        this.verificationId = verificationId;
        this.status = status;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getVerificationId() {
        return verificationId;
    }

    public String getStatus() {
        return status;
    }
}