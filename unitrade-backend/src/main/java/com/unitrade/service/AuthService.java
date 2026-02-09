package com.unitrade.service;

import com.unitrade.entity.Role;
import com.unitrade.entity.User;
import com.unitrade.enums.UserStatus;
import com.unitrade.repository.RoleRepository;
import com.unitrade.repository.UserRepository;
import org.springframework.stereotype.Service;

/**
 * AuthService handles authentication related operations.
 *
 * Responsibilities:
 * 1. User Registration
 * 2. User Login
 *
 * NOTE:
 * - JWT is NOT used yet
 * - Password is NOT encrypted yet
 * - Approval flow is handled using StudentVerificationService
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final StudentVerificationService studentVerificationService;

    /**
     * Constructor injection.
     * Spring automatically injects required beans.
     */
    public AuthService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       StudentVerificationService studentVerificationService) {

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.studentVerificationService = studentVerificationService;
    }

    /**
     * Registers a new user in the system.
     *
     * REGISTRATION FLOW:
     * 1. Fetch role from database (STUDENT / HOD / ADMIN)
     * 2. Assign role to user
     * 3. Set default status as PENDING
     * 4. Save user in database
     * 5. If user is STUDENT:
     *      - Find corresponding HOD (same college + department)
     *      - Create StudentVerification request
     */
    public User register(User user) {

        // STEP 1: Fetch role from DB using roleId sent from frontend
        Role role = roleRepository.findById(user.getRole().getId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // STEP 2: Assign fetched role to user
        user.setRole(role);

        // STEP 3: Set default status as PENDING
        // Student will not be active until HOD approves
        user.setStatus(UserStatus.PENDING);

        // STEP 4: Save user first (we need user ID for verification table)
        User savedUser = userRepository.save(user);

        // STEP 5: ONLY for STUDENT → create verification request
        if (role.getName().equalsIgnoreCase("STUDENT")) {

            // Find HOD who belongs to same college & department
            User hod = userRepository
                    .findByRole_NameAndCollege_IdAndDepartment_Id(
                            "HOD",
                            user.getCollege().getId(),
                            user.getDepartment().getId()
                    )
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "No HOD found for this college and department")
                    );

            // Create verification request for HOD approval
            studentVerificationService.createRequest(savedUser, hod);
        }

        // Return saved user
        return savedUser;
    }

    /**
     * Login user using email and password.
     *
     * CURRENT LOGIC (Simple):
     * - Fetch all users
     * - Match email and password
     * - Return user if match found
     *
     * NOTE:
     * - No JWT yet
     * - No password encryption yet
     * - Status check will be added later
     */
    public User login(String email, String password) {

        return userRepository.findAll()
                .stream()
                .filter(u -> u.getEmail().equals(email)
                        && u.getPassword().equals(password))
                .findFirst()
                .orElseThrow(() ->
                        new RuntimeException("Invalid email or password"));
    }
}
