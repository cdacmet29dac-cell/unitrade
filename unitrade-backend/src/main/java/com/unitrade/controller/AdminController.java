package com.unitrade.controller;

import com.unitrade.entity.User;
import com.unitrade.enums.UserStatus;
import com.unitrade.service.AdminService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    // ✅ Get all users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return adminService.getAllUsers();
    }

    // ✅ Get pending HOD approvals
    @GetMapping("/hod/pending")
    public List<User> getPendingHods() {
        return adminService.getPendingHods();
    }

    // ✅ Approve / Reject HOD
    @PutMapping("/users/{userId}/status")
    public User updateUserStatus(
            @PathVariable Long userId,
            @RequestParam UserStatus status
    ) {
        return adminService.updateUserStatus(userId, status);
    }
}