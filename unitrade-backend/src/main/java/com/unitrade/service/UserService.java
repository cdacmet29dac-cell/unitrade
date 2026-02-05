package com.unitrade.service;

import com.unitrade.entity.User;
import com.unitrade.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * UserService contains business logic related to users.
 */
@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Fetch all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Fetch user by ID
    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}
