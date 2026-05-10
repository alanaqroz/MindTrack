package com.example.demo.controller;

import com.example.demo.model.Subject;
import com.example.demo.service.SubjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/subjects")
public class SubjectController {

    private final SubjectService service;

    public SubjectController(SubjectService service) {
        this.service = service;
    }

    // CREATE
    @PostMapping
    public Subject create(@RequestBody Subject subject) {
        return service.create(subject);
    }

    // READ
    @GetMapping
    public List<Subject> findAll() {
        return service.findAll();
    }

    // UPDATE
    @PutMapping("/{id}")
    public Subject update(@PathVariable Long id,
                          @RequestBody Subject subject) {

        return service.update(id, subject);
    }

    // DELETE
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}