import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { projects, categories } from '../data/data'
import ProjectModal from '../components/ProjectModal'
import '../styles/Projets.css'

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const cardVariants = {
  hidden:  { opacity: 0, scale: 0.92, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
}

export default function Projets() {
  const [activeCategory, setActiveCategory] = useState('Tous')
  const [selectedProject, setSelectedProject] = useState(null)

  const filtered = activeCategory === 'Tous'
    ? projects
    : projects.filter(p => p.category === activeCategory)

  return (
    <div className="projets-page">
      <div className="projets-content">
        {/* Title */}
        <motion.h2
          className="projets-title"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          Mes projets
        </motion.h2>

        {/* Filters */}
        <motion.div
          className="projets-filters"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.08 }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className="projets-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filtered.map(project => (
              <motion.div
                key={project.id}
                className="project-card"
                variants={cardVariants}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                onClick={() => setSelectedProject(project)}
              >
                {/* Thumbnail */}
                <div className="project-card-img-wrapper">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="project-card-img"
                    loading="lazy"
                  />
                  {/* Hover overlay */}
                  <div className="project-card-overlay">
                    <span className="project-card-cta">Voir le projet →</span>
                  </div>
                </div>

                {/* Info */}
                <div className="project-card-body">
                  <div className="project-card-meta">
                    <span className="tag tag-blue" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                      {project.category}
                    </span>
                  </div>
                  <h3 className="project-card-title">{project.title}</h3>
                  <div className="project-card-tags">
                    {project.tags.slice(0, 3).map(t => (
                      <span key={t} className="project-tag">{t}</span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="project-tag">+{project.tags.length - 3}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}