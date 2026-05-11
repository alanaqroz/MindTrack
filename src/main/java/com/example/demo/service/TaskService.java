package com.example.demo.service;

import com.example.demo.model.Task;
import com.example.demo.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    // Create
    public Task create(Task task) {
        return repository.save(task);
    }

    // Read
    public List<Task> findAll() {
        return repository.findAll();
    }

    public Task complete(Long id) {

        Task task = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setCompleted(true);

        return repository.save(task);
    }

    // Delete
    public void delete(Long id) {
        repository.deleteById(id);
    }
}