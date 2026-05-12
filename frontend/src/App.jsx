import { useState } from 'react'
import Sidebar from './components/Sidebar.jsx'
import Dashboard from './components/Dashboard.jsx'
import SubjectList from './components/SubjectList.jsx'
import TaskList from './components/TaskList.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [selectedSubject, setSelectedSubject] = useState(null)

  const navigateTo = (page) => {
    setCurrentPage(page)
    setSelectedSubject(null)
  }

  const openSubject = (subject) => {
    setSelectedSubject(subject)
    setCurrentPage('tasks')
  }

  const renderPage = () => {
    if (currentPage === 'tasks' && selectedSubject) {
      return <TaskList subject={selectedSubject} onBack={() => navigateTo('subjects')} />
    }
    if (currentPage === 'subjects') {
      return <SubjectList onSelectSubject={openSubject} />
    }
    return <Dashboard onNavigate={navigateTo} onSelectSubject={openSubject} />
  }

  return (
    <div className="app-layout">
      <Sidebar currentPage={currentPage} onNavigate={navigateTo} />
      <main className="app-main">{renderPage()}</main>
    </div>
  )
}

export default App
