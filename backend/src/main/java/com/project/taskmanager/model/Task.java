package com.project.taskmanager.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Task {
   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private String status; // e.g., "To Do", "In Progress", "Done" 
}
