package com.unitrade.entity;

import jakarta.persistence.*;

/**
 * Department master entity.
 * Example: CSE, IT, ENTC, MECH
 */
@Entity
@Table(name = "departments")
public class Department {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    // Many departments belong to one college
    @ManyToOne
    @JoinColumn(name = "college_id", nullable = false)
    private College college;

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public College getCollege() { return college; }
    public void setCollege(College college) { this.college = college; }
}
