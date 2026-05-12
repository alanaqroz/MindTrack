import { useState, useEffect } from 'react'
import { subjectAPI, taskAPI } from '../services/api.js'

export default function SubjectList({ onSelectSubject }) {
  const [subjects, setSubjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [newName, setNewName] = useState('')
  const [loading, setLoading] = useState(true)

  const loadData = () => {
    Promise.all([subjectAPI.getAll(), taskAPI.getAll()])
      .then(([s, t]) => {
        setSubjects(s)
        setTasks(t)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    loadData()
  }, [])

  const getProgress = (subjectId) => {
    const subTasks = tasks.filter((t) => t.subject?.id === subjectId)
    if (subTasks.length === 0) return { total: 0, completed: 0, pct: 0 }
    const completed = subTasks.filter((t) => t.completed).length
    return {
      total: subTasks.length,
      completed,
      pct: Math.round((completed / subTasks.length) * 100),
    }
  }

  const handleCreate = async () => {
    if (!newName.trim()) return
    await subjectAPI.create(newName.trim())
    setNewName('')
    setShowModal(false)
    loadData()
  }

  const handleDelete = async (e, id) => {
    e.stopPropagation()
    if (window.confirm('Deletar esta matéria?')) {
      await subjectAPI.delete(id)
      loadData()
    }
  }

  if (loading) return <p style={{ color: 'var(--text-secondary)' }}>Carregando...</p>

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Minhas Matérias</h1>
        <button className="btn-primary" onClick={() => setShowModal(true)}>
          + Nova matéria
        </button>
      </div>

      {subjects.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-text">Nenhuma matéria ainda. Adicione a primeira!</p>
        </div>
      ) : (
        <div className="subjects-grid">
          {subjects.map((subject) => {
            const prog = getProgress(subject.id)
            return (
              <div key={subject.id} className="subject-card">
                <div className="subject-card-header">
                  <span className="subject-name">{subject.name}</span>
                  <button
                    className="btn-icon"
                    onClick={(e) => handleDelete(e, subject.id)}
                    title="Deletar"
                  >
                    x
                  </button>
                </div>

                <div>
                  <div className="subject-stats">
                    <span>
                      {prog.total} tarefa{prog.total !== 1 ? 's' : ''}
                    </span>
                    <span className="subject-percent">{prog.pct}%</span>
                  </div>
                  <div className="progress-bar-wrap">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${prog.pct}%` }}
                    />
                  </div>
                </div>

                <button
                  className="btn-primary"
                  style={{ justifyContent: 'center' }}
                  onClick={() => onSelectSubject(subject)}
                >
                  Ver tarefas
                </button>
              </div>
            )
          })}
        </div>
      )}

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Nova matéria</h2>
            <input
              className="input-text"
              placeholder="Ex: Matemática, Física, Inglês..."
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
              autoFocus
              style={{ width: '100%' }}
            />
            <div className="modal-actions">
              <button className="btn-ghost" onClick={() => setShowModal(false)}>
                Cancelar
              </button>
              <button className="btn-primary" onClick={handleCreate}>
                Criar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
