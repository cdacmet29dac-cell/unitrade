package com.unitrade.service;

import com.unitrade.entity.Role;
import com.unitrade.repository.RoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * RoleService contains the business logic related to roles.
 * It talks to the RoleRepository to save and fetch data.
 */
@Service
public class RoleService {

    private final RoleRepository roleRepository;

    /**
     * Constructor injection is used here.
     * Spring automatically injects RoleRepository.
     */
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    /**
     * This method saves a new role into the database.
     * Example roles: STUDENT, HOD, ADMIN
     */
    public Role createRole(Role role) {
        return roleRepository.save(role);
    }

    /**
     * This method returns all roles from the database.
     */
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
    
    /**
     * Fetch role by ID.
     * Used during user registration.
     */
    public Role getRoleById(Long roleId) {
        return roleRepository.findById(roleId)
                .orElseThrow(() -> new RuntimeException("Role not found"));
    }
}
