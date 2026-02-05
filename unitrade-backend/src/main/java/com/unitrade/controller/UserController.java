package com.unitrade.controller;

import com.unitrade.entity.User;
import com.unitrade.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * UserController handles APIs related to users.
 * This is mainly used to fetch users for testing/admin purposes.
 */
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    // Constructor injection
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * Get all users
     * URL: GET /api/users
     */
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    /**
     * Get user by ID
     * URL: GET /api/users/{id}
     */
    @GetMapping("/{id}")
    public User getUserById(@PathVariable Long id) {
        return userService.getUserById(id);
    }
}
