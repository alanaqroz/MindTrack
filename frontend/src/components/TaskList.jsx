import { useState, useEffect } from 'react'
import { taskAPI } from '../services/api.js'

export default function TaskList({ subject, onBack }) {
  const [tasks, setTasks] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [loading, setLoading] = useState(true)

  const loadTasks = () => {
    taskAPI.getAll().then((all) => {
      setTasks(all.filter((t) => t.subject?.id === subject.id))
      setLoading(false)
    })
  }

  useEffect(() => {
    loadTasks()
  }, [subject.id])

  const handleAdd = async () => {
    const title = newTitle.trim()
    if (!title) return
    await taskAPI.create(title, subject.id)
    setNewTitle('')
    loadTasks()
  }

  const handleComplete = async (task) => {
    if (task.completed) return
    await taskAPI.complete(task.id)
    loadTasks()
  }

  const handleDelete = async (id) => {
    await taskAPI.delete(id)
    loadTasks()
  }

  const completed = tasks.filter((t) => t.completed).length
  const pct = tasks.length > 0 ? Math.round((completed / tasks.length) * 100) : 0

  return (
    <div>
      <div className="task-list-header">
        <button className="back-btn" onClick={onBack}>
          &larr; Voltar
        </button>
        <div className="task-header-info">
          <h1 className="task-subject-name">{subject.name}</h1>
          <p className="task-subject-progress-text">
            {completed} de {tasks.length} tarefas concluídas
          </p>
        </div>
        <span className="tag-green">{pct}% concluído</span>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <div className="progress-bar-wrap" style={{ height: 10 }}>
          <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="task-add-form">
        <input
          className="input-text"
          placeholder="Adicionar nova tarefa..."
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
        />
        <button className="btn-primary" onClick={handleAdd}>
          + Adicionar
        </button>
      </div>

      {loading ? (
        <p style={{ color: 'var(--text-secondary)' }}>Carregando...</p>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-text">Nenhuma tarefa ainda. Adicione a primeira!</p>
        </div>
      ) : (
        <div className="task-items">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`task-item${task.completed ? ' done' : ''}`}
            >
              <div
                className={`task-checkbox${task.completed ? ' checked' : ''}`}
                onClick={() => handleComplete(task)}
                title={task.completed ? 'Concluída' : 'Marcar como concluída'}
              >
                {task.completed && '✓'}
              </div>
              <span className="task-title">{task.title}</span>
              <button
                className="btn-icon"
                onClick={() => handleDelete(task.id)}
                title="Deletar"
              >
                x
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
