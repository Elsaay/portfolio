import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Projets from './pages/Projets'
import CustomCursor from './components/CustomCursor'
import './styles/App.css'

// Inner layout — needs to be inside BrowserRouter to use hooks
function Layout({ theme, onToggleTheme }) {
  const location = useLocation()
  const navigate = useNavigate()

  const navigateTo = (path) => {
    if (path === location.pathname) return
    navigate(path)
  }

  return (
    <div className="app">
      <CustomCursor />
      <Navbar
        currentPath={location.pathname}
        onNavigate={navigateTo}
        theme={theme}
        onToggleTheme={onToggleTheme}
      />

      <div className="page-container">
        <Routes location={location}>
          <Route path="/"        element={<Home onNavigate={navigateTo} />} />
          <Route path="/projets" element={<Projets />} />
          <Route path="*"        element={<Home onNavigate={navigateTo} />} />
        </Routes>
      </div>
    </div>
  )
}

export default function App() {
  const [theme, setTheme] = useState('dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')

  return (
    <BrowserRouter>
      <Layout theme={theme} onToggleTheme={toggleTheme} />
    </BrowserRouter>
  )
}