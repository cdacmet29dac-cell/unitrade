package com.unitrade.controller;

import com.unitrade.entity.User;
import com.unitrade.service.AuthService;
import org.springframework.web.bind.annotation.*;

/**
 * AuthController exposes authentication-related APIs.
 * Currently supports USER REGISTRATION.
 */
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    /**
     * Constructor injection for AuthService.
     */
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * Registration API
     * URL: POST /api/auth/register
     */
    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authService.register(user);
    }
    
    /**
     * Login API
     * URL: POST /api/auth/login
     */
    @PostMapping("/login")
    public User login(@RequestBody User loginRequest) {
        return authService.login(
                loginRequest.getEmail(),
                loginRequest.getPassword()
        );
    }

}
