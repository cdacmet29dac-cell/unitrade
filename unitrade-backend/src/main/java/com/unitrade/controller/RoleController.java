package com.unitrade.controller;

import com.unitrade.entity.Role;
import com.unitrade.service.RoleService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * RoleController exposes REST APIs for Role operations.
 * This is the entry point for HTTP requests.
 */
@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleService roleService;

    /**
     * Constructor injection for RoleService.
     */
    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    /**
     * API to create a new role.
     * URL: POST /api/roles
     */
    @PostMapping
    public Role createRole(@RequestBody Role role) {
        return roleService.createRole(role);
    }

    /**
     * API to fetch all roles.
     * URL: GET /api/roles
     */
    @GetMapping
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }
}
