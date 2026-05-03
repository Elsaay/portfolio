import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/ProjectModal.css'

export default function ProjectModal({ project, onClose }) {
  const [currentImg, setCurrentImg] = useState(0)
  const [imgDirection, setImgDirection] = useState(0)

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [currentImg])

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const nextImage = () => {
    if (currentImg < project.images.length - 1) {
      setImgDirection(1)
      setCurrentImg(prev => prev + 1)
    }
  }

  const prevImage = () => {
    if (currentImg > 0) {
      setImgDirection(-1)
      setCurrentImg(prev => prev - 1)
    }
  }

  const imgVariants = {
    enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit:   (dir) => ({ x: dir < 0 ? '100%' : '-100%', opacity: 0 }),
  }

  return (
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        className="modal-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="modal"
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 30 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button className="modal-close" onClick={onClose} aria-label="Fermer">
          ✕
        </button>

        {/* Image slider */}
        <div className="modal-slider">
          {/* Images */}
          <div className="modal-slider-track">
            <AnimatePresence initial={false} custom={imgDirection} mode="wait">
              <motion.img
                key={currentImg}
                src={project.images[currentImg]}
                alt={`${project.title} - image ${currentImg + 1}`}
                className="modal-image"
                custom={imgDirection}
                variants={imgVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              />
            </AnimatePresence>
          </div>

          {/* Arrows */}
          {project.images.length > 1 && (
            <>
              <button
                className={`modal-arrow modal-arrow-left ${currentImg === 0 ? 'disabled' : ''}`}
                onClick={prevImage}
                disabled={currentImg === 0}
                aria-label="Image précédente"
              >
                ‹
              </button>
              <button
                className={`modal-arrow modal-arrow-right ${currentImg === project.images.length - 1 ? 'disabled' : ''}`}
                onClick={nextImage}
                disabled={currentImg === project.images.length - 1}
                aria-label="Image suivante"
              >
                ›
              </button>
            </>
          )}

          {/* Dots */}
          {project.images.length > 1 && (
            <div className="modal-dots">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  className={`modal-dot ${i === currentImg ? 'active' : ''}`}
                  onClick={() => {
                    setImgDirection(i > currentImg ? 1 : -1)
                    setCurrentImg(i)
                  }}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="modal-body">
          <div className="modal-meta">
            <span className="tag tag-blue">{project.category}</span>
            <span className="modal-img-count">
              {currentImg + 1} / {project.images.length}
            </span>
          </div>

          <h2 className="modal-title">{project.title}</h2>
          <p className="modal-description">{project.description}</p>

          <div className="modal-tags">
            {project.tags.map(t => (
              <span key={t} className="tag tag-pink">{t}</span>
            ))}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}