package com.example.demo.model;

import jakarta.persistence.*;

@Entity
public class Task {

    public enum Priority {
        ALTA, MEDIA, BAIXA
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private boolean completed;

    @Enumerated(EnumType.STRING)
    private Priority priority = Priority.MEDIA;

    @ManyToOne
    @JoinColumn(name = "subject_id")
    private Subject subject;

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public boolean isCompleted() {
        return completed;
    }

    public Priority getPriority() {
        return priority;
    }

    public Subject getSubject() {
        return subject;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public void setSubject(Subject subject) {
        this.subject = subject;
    }
}