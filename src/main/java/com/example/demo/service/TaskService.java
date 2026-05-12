package com.example.demo.service;

import com.example.demo.model.Subject;
import com.example.demo.model.Task;
import com.example.demo.repository.SubjectRepository;
import com.example.demo.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {

    private final TaskRepository repository;
    private final SubjectRepository subjectRepository;

    public TaskService(TaskRepository repository, SubjectRepository subjectRepository) {
        this.repository = repository;
        this.subjectRepository = subjectRepository;
    }

    // Create
    public Task create(Task task) {
        if (task.getSubject() != null && task.getSubject().getId() != null) {
            Subject subject = subjectRepository.findById(task.getSubject().getId())
                    .orElseThrow(() -> new RuntimeException("Matéria não encontrada"));
            task.setSubject(subject);
        }
        return repository.save(task);
    }

    // Read
    public List<Task> findAll() {
        return repository.findAll();
    }

    // Complete
    public Task complete(Long id) {
        Task task = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tarefa não encontrada"));
        task.setCompleted(true);
        return repository.save(task);
    }

    // Delete
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
