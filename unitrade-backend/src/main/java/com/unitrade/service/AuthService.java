package com.unitrade.service;

import com.unitrade.dto.RegisterResponse;
import com.unitrade.entity.Role;
import com.unitrade.entity.StudentVerification;
import com.unitrade.entity.User;
import com.unitrade.enums.UserStatus;
import com.unitrade.repository.RoleRepository;
import com.unitrade.repository.UserRepository;
import com.unitrade.security.JwtUtil;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * Handles registration & login.
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final StudentVerificationService studentVerificationService;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
                       RoleRepository roleRepository,
                       StudentVerificationService studentVerificationService,
                       PasswordEncoder passwordEncoder,
                       JwtUtil jwtUtil) {

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.studentVerificationService = studentVerificationService;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    /**
     * REGISTER USER
     */
    public RegisterResponse register(User user) {

        Role role = roleRepository.findById(user.getRole().getId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        user.setRole(role);
        user.setStatus(UserStatus.PENDING);

        // Encode password
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        User savedUser = userRepository.save(user);

        Long verificationId = null;

        // ✅ ROLE CHECK MUST MATCH DB
        if ("ROLE_STUDENT".equalsIgnoreCase(role.getName())) {

            User hod = userRepository
                    .findByRole_NameAndCollege_IdAndDepartment_Id(
                            "ROLE_HOD",
                            user.getCollege().getId(),
                            user.getDepartment().getId()
                    )
                    .orElseThrow(() ->
                            new RuntimeException("No HOD found"));

            StudentVerification verification =
                    studentVerificationService.createRequest(savedUser, hod);

            verificationId = verification.getId();
        }

        return new RegisterResponse(
                savedUser.getId(),
                verificationId,
                savedUser.getStatus().name()
        );
    }

    /**
     * LOGIN → JWT
     */
    public String login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        if (user.getStatus() != UserStatus.APPROVED) {
            throw new RuntimeException("Account not approved by HOD");
        }

        return jwtUtil.generateToken(
        	    user.getEmail(),
        	    user.getRole().getName(),
        	    user.getId()
        	);

    }
}