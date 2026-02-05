package com.unitrade.service;

import com.unitrade.entity.Role;
import com.unitrade.entity.User;
import com.unitrade.repository.RoleRepository;
import com.unitrade.repository.UserRepository;
import org.springframework.stereotype.Service;

/**
 * AuthService handles authentication-related operations.
 * For now, it only handles USER REGISTRATION.
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;

    /**
     * Constructor injection.
     * Spring automatically provides repository objects.
     */
    public AuthService(UserRepository userRepository,
                       RoleRepository roleRepository) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
    }

    /**
     * Registers a new user in the system.
     * Steps:
     * 1. Fetch role from DB using roleId
     * 2. Assign role to user
     * 3. Save user in database
     */
    public User register(User user) {

        // Fetch role from database using role id
        Role role = roleRepository.findById(user.getRole().getId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // Assign role to user
        user.setRole(role);

        // Save user into database
        return userRepository.save(user);
    }
    
    /**
     * Login user using email and password.
     */
    public User login(String email, String password) {

        User user = userRepository.findAll()
                .stream()
                .filter(u -> u.getEmail().equals(email)
                          && u.getPassword().equals(password))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        return user;
    }

}
