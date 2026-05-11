package com.example.demo.controller;

import com.example.demo.model.Task;
import com.example.demo.service.TaskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService service;

    public TaskController(TaskService service) {
        this.service = service;
    }

    // Create
    @PostMapping
    public Task create(@RequestBody Task task) {
        return service.create(task);
    }

    // Read
    @GetMapping
    public List<Task> findAll() {
        return service.findAll();
    }

    // Complete
    @PutMapping("/{id}/complete")
    public Task complete(@PathVariable Long id) {
        return service.complete(id);
    }

    // Delete
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.delete(id);
    }
}