package com.unitrade.service;

import com.unitrade.entity.User;
import com.unitrade.enums.UserStatus;
import com.unitrade.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;

    public AdminService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 🔹 Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // 🔹 Get all pending HODs
    public List<User> getPendingHods() {
        return userRepository.findByRole_NameAndStatus(
                "ROLE_HOD",
                UserStatus.PENDING
        );
    }

    // 🔹 Approve / Reject HOD
    public User updateUserStatus(Long userId, UserStatus status) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setStatus(status);

        return userRepository.save(user);
    }
}