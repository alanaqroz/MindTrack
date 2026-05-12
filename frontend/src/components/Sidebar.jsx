const navItems = [
  { id: 'dashboard', label: 'Dashboard' },
  { id: 'subjects', label: 'Matérias' },
]

export default function Sidebar({ currentPage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">MT</div>
        <span className="sidebar-logo-text">MindTrack</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`sidebar-nav-item${
              currentPage === item.id ||
              (currentPage === 'tasks' && item.id === 'subjects')
                ? ' active'
                : ''
            }`}
            onClick={() => onNavigate(item.id)}
          >
            <span className="nav-dot" />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}
