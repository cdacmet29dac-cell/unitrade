package com.unitrade.repository;

import com.unitrade.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * This interface is used to access the users table.
 * Spring automatically creates the implementation.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    // No methods needed for now
}
