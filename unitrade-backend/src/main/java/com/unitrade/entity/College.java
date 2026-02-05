package com.unitrade.entity;

import jakarta.persistence.*;
import java.util.List;

/**
 * College master entity.
 * Example: IIT Mumbai, IIT Goa, IIT Delhi
 */
@Entity
@Table(name = "colleges")
public class College {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    // One college can have many departments
    @OneToMany(mappedBy = "college")
    private List<Department> departments;

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
