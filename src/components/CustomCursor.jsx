import { useEffect, useRef } from 'react'

const DURATION = 500
const MAX_OPACITY = 0.3
const MAX_SIZE = 3

function getTrailColor() {
  const theme = document.documentElement.getAttribute('data-theme')
  if (theme === 'light') {
    return getComputedStyle(document.documentElement).getPropertyValue('--blue-dark').trim()
  }
  return '255, 255, 255'
}

function toRgba(color, opacity) {
  if (color === '255, 255, 255') return `rgba(255, 255, 255, ${opacity})`
  // color est une valeur CSS hex ex: #B0A898 → on la convertit en rgb
  const hex = color.replace('#', '')
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `rgba(${r}, ${g}, ${b}, ${opacity})`
}

export default function CustomCursor() {
  const canvasRef = useRef(null)
  const trail = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      trail.current.push({ x: e.clientX, y: e.clientY, t: Date.now() })
    }
    window.addEventListener('mousemove', onMove)

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const now = Date.now()
      const color = getTrailColor()
      trail.current = trail.current.filter(p => now - p.t < DURATION)

      trail.current.forEach(p => {
        const progress = (now - p.t) / DURATION
        const opacity  = (1 - progress) * MAX_OPACITY
        const size     = (1 - progress) * MAX_SIZE

        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fillStyle = toRgba(color, opacity)
        ctx.fill()
      })

      rafRef.current = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}
    />
  )
}
