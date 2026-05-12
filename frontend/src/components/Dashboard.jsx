import { useState, useEffect } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import { subjectAPI, taskAPI } from '../services/api.js'

ChartJS.register(ArcElement, Tooltip)

export default function Dashboard({ onNavigate, onSelectSubject }) {
  const [subjects, setSubjects] = useState([])
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([subjectAPI.getAll(), taskAPI.getAll()])
      .then(([s, t]) => {
        setSubjects(s)
        setTasks(t)
      })
      .finally(() => setLoading(false))
  }, [])

  const totalTasks = tasks.length
  const completedTasks = tasks.filter((t) => t.completed).length
  const percentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0

  const getSubjectProgress = (subjectId) => {
    const subTasks = tasks.filter((t) => t.subject?.id === subjectId)
    if (subTasks.length === 0) return { total: 0, completed: 0, pct: 0 }
    const completed = subTasks.filter((t) => t.completed).length
    return {
      total: subTasks.length,
      completed,
      pct: Math.round((completed / subTasks.length) * 100),
    }
  }

  const chartData = {
    datasets: [
      {
        data: [completedTasks, Math.max(0, totalTasks - completedTasks)],
        backgroundColor: ['#52B788', '#D8F3DC'],
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  }

  const chartOptions = {
    cutout: '76%',
    plugins: { legend: { display: false }, tooltip: { enabled: false } },
    responsive: true,
  }

  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'Bom dia' : hour < 18 ? 'Boa tarde' : 'Boa noite'

  if (loading) return <p style={{ color: 'var(--text-secondary)' }}>Carregando...</p>

  return (
    <div>
      <div className="dashboard-header">
        <h1 className="dashboard-greeting">{greeting}</h1>
        <p className="dashboard-subtitle">Aqui está o seu progresso de estudos</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card light">
          <div className="stat-label-top">Matérias</div>
          <div className="stat-value">{subjects.length}</div>
          <div className="stat-label-bottom">cadastradas</div>
        </div>
        <div className="stat-card mid">
          <div className="stat-label-top">Concluídas</div>
          <div className="stat-value">{completedTasks}</div>
          <div className="stat-label-bottom">tarefas feitas</div>
        </div>
        <div className="stat-card dark">
          <div className="stat-label-top">Progresso</div>
          <div className="stat-value">{percentage}%</div>
          <div className="stat-label-bottom">geral</div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <p className="section-title">Progresso por matéria</p>
          {subjects.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state-text">
                Nenhuma matéria ainda.
                <br />
                <button
                  className="btn-primary"
                  style={{ marginTop: 14 }}
                  onClick={() => onNavigate('subjects')}
                >
                  + Adicionar matéria
                </button>
              </p>
            </div>
          ) : (
            <div className="subject-mini-list">
              {subjects.map((subject) => {
                const prog = getSubjectProgress(subject.id)
                return (
                  <div
                    key={subject.id}
                    className="subject-mini-item"
                    onClick={() => onSelectSubject(subject)}
                  >
                    <div className="subject-mini-header">
                      <span className="subject-mini-name">{subject.name}</span>
                      <span className="subject-mini-pct">
                        {prog.completed}/{prog.total} · {prog.pct}%
                      </span>
                    </div>
                    <div className="progress-bar-wrap">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${prog.pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div
          className="card"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 16,
          }}
        >
          <p className="section-title" style={{ alignSelf: 'flex-start' }}>
            Conclusão geral
          </p>
          <div className="chart-wrap">
            <Doughnut data={chartData} options={chartOptions} />
            <div className="chart-center-label">
              <div className="chart-center-value">{percentage}%</div>
              <div className="chart-center-text">concluído</div>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', textAlign: 'center' }}>
            {completedTasks} de {totalTasks} tarefas
          </p>
        </div>
      </div>
    </div>
  )
}
