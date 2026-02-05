package com.unitrade.repository;

import com.unitrade.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * This interface is used to access the roles table.
 */
public interface RoleRepository extends JpaRepository<Role, Long> {
    // No methods needed for now
}
