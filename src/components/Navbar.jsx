import { motion } from 'framer-motion'
import '../styles/Navbar.css'

const navItems = [
  { path: '/',        label: 'À propos' },
  { path: '/projets', label: 'Mes projets' },
]

export default function Navbar({ currentPath, onNavigate, theme, onToggleTheme }) {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <button
          className={`nav-logo ${currentPath === '/' ? 'active' : ''}`}
          onClick={() => onNavigate('/')}
        >
          Lisa Y
        </button>

        <div className="nav-links">
          {navItems.map((item) => (
            <button
              key={item.path}
              className={`nav-item ${currentPath === item.path ? 'active' : ''}`}
              onClick={() => onNavigate(item.path)}
            >
              {item.label}
              {currentPath === item.path && (
                <motion.span
                  className="nav-indicator"
                  layoutId="nav-indicator"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        <button
          className="theme-toggle"
          onClick={onToggleTheme}
          title={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
          aria-label="Toggle theme"
        >
          <motion.span
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </motion.span>
        </button>
      </div>
    </nav>
  )
}