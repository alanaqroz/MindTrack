package com.example.demo.service;

import com.example.demo.model.Subject;
import com.example.demo.repository.SubjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SubjectService {

    private final SubjectRepository repository;

    public SubjectService(SubjectRepository repository) {
        this.repository = repository;
    }

    // CREATE
    public Subject create(Subject subject) {
        return repository.save(subject);
    }

    // READ
    public List<Subject> findAll() {
        return repository.findAll();
    }

    // UPDATE
    public Subject update(Long id, Subject subject) {
        Subject existingSubject = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        existingSubject.setName(subject.getName());

        return repository.save(existingSubject);
    }

    // DELETE
    public void delete(Long id) {
        repository.deleteById(id);
    }
}