import { useRef, useEffect, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { parcours, experience } from '../data/data'
import lisaPhoto from '../assets/cv_pic.jpg'
import '../styles/Home.css'
import '../styles/Profil.css'
import '../styles/Parcours.css'

/* ─── Hero variants ─── */
const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}
const heroItem = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
}

/* ─── Profil variants ─── */
const profilContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const profilItem = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] } },
}

/* ─── Tag variants ─── */
const tagContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
}
const tagItem = {
  hidden:  { opacity: 0, scale: 0.7, y: 6 },
  visible: { opacity: 1, scale: 1,   y: 0, transition: { duration: 0.28, ease: [0.4, 0, 0.2, 1] } },
}

/* ─── Parcours helpers ─── */
const typeColors = {
  Pro:       { tag: 'tag-pink', dot: '#B0A898' },
  Formation: { tag: 'tag-blue', dot: '#A8A49C' },
  Freelance: { tag: 'tag-blue', dot: '#A8A49C' },
}


function AccordionItem({ item, index, total }) {
  const [isOpen, setIsOpen] = useState(false)
  const [hasBeenRevealed, setHasBeenRevealed] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenRevealed) {
          setHasBeenRevealed(true)
          const timer = setTimeout(() => setIsOpen(true), index * 180)
          return () => clearTimeout(timer)
        }
      },
      { threshold: 0.25 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [hasBeenRevealed, index])

  const color = typeColors[item.type] || typeColors.Formation

  return (
    <motion.div
      ref={ref}
      className={`accordion-item ${isOpen ? 'open' : ''}`}
      initial={{ opacity: 0, x: -24 }}
      animate={hasBeenRevealed ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
      transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1], delay: index * 0.05 }}
    >
      <div className="accordion-timeline">
        <div className="accordion-dot" style={{ background: color.dot }} />
        {index < total - 1 && <div className="accordion-line" />}
      </div>

      <div className="accordion-content">
        <button
          className="accordion-header"
          onClick={() => setIsOpen(prev => !prev)}
          aria-expanded={isOpen}
        >
          <div className="accordion-header-left">
            <span className="accordion-year">{item.year}</span>
            <div className="accordion-title-row">
              <h3 className="accordion-title">{item.title}</h3>
              <span className={`tag ${color.tag}`} style={{ fontSize: '0.7rem', padding: '2px 8px' }}>
                {item.type}
              </span>
            </div>
            <span className="accordion-company">{item.company}</span>
          </div>
          <motion.span
            className="accordion-chevron"
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          >
            ▾
          </motion.span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              className="accordion-body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="accordion-body-inner">
                <p className="accordion-description">{item.description}</p>
                <div className="accordion-tags">
                  {item.tags.map(t => (
                    <span key={t} className="tag tag-blue" style={{ fontSize: '0.72rem' }}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

/* ─── Page principale ─── */
export default function Home({ onNavigate }) {
  const profilRef = useRef(null)
  const isProfilInView = useInView(profilRef, { once: true, margin: '-100px' })

  const scrollToProfil = () => {
    profilRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="landing-page">

      {/* ── Hero ── */}
      <section className="section">
        <div className="home-page">
          <motion.div
            className="home-content"
            variants={heroContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="home-hero" variants={heroItem}>
              <div className="home-avatar-wrapper">
                <img className="home-avatar" src={lisaPhoto} alt="Lisa Yous" />
                <div className="home-avatar-ring" />
              </div>
              <div className="home-text">
                <motion.h1 className="home-name" variants={heroItem}>Lisa YOUS</motion.h1>
                <motion.p className="home-role" variants={heroItem}>Développeuse Full Stack</motion.p>
                <motion.p className="home-bio" variants={heroItem}>
                  Développeuse web full-stack avec 2 ans d'expérience en front-end. Mon engagement à me former
                  continuellement me permet de monter rapidement en compétences et de m'adapter à différents
                  environnements techniques. Polyvalente et motivée. Disponible à partir de septembre 2026 pour
                  poursuivre mon évolution et contribuer efficacement à des projets web.
                </motion.p>
                <motion.div className="home-actions" variants={heroItem}>
                  <button className="btn-primary" onClick={scrollToProfil}>Mon profil</button>
                  <button className="btn-secondary" onClick={() => onNavigate('/projets')}>Mes projets</button>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Profil / Skills ── */}
      <section className="section">
        <div className="profil-page" ref={profilRef}>
          <motion.div
            className="profil-content"
            variants={profilContainer}
            initial="hidden"
            animate={isProfilInView ? 'visible' : 'hidden'}
          >
<motion.h2 className="parcours-title" variants={profilItem}>
              Mes Technologies
            </motion.h2>

            <div className="profil-skills-grid">
              <motion.div className="profil-card" variants={profilItem}>
                <h3 className="profil-card-title">
                  <span className="profil-card-dot dot-blue" />Front-end
                </h3>
                <motion.div className="profil-tags-row" variants={tagContainer}>
                  {['HTML', 'CSS', 'JavaScript', 'React.js', 'Vue.js', 'Tailwind', 'Framer Motion'].map(t => (
                    <motion.span key={t} className="tag tag-pink" variants={tagItem} whileHover={{ scale: 1.1, y: -2 }}>
                      {t}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
              <motion.div className="profil-card" variants={profilItem}>
                <h3 className="profil-card-title">
                  <span className="profil-card-dot dot-pink" />Back-end
                </h3>
                <motion.div className="profil-tags-row" variants={tagContainer}>
                  {['Node.js', 'PHP', 'Symfony', 'MySQL', 'Docker', 'Kubernetes', 'Java'].map(t => (
                    <motion.span key={t} className="tag tag-blue" variants={tagItem} whileHover={{ scale: 1.1, y: -2 }}>
                      {t}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </div>

            <motion.h2 className="parcours-title" variants={profilItem}>
              Loisirs
            </motion.h2>

            <motion.div className="profil-loisirs" variants={profilItem}>
              <div className="loisirs-content">
                <div className="loisirs-tags">
                  {['Musculation', 'Cuisine', 'Jeux vidéos', 'Voyages', 'Psychologie', 'Musique'].map(l => (
                    <span key={l} className="tag tag-blue">{l}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Expérience Professionnelle ── */}
      <section className="section">
        <div className="parcours-page">
          <motion.div
            className="parcours-content"
            variants={profilContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.h2 className="parcours-title" variants={profilItem}>
              Expérience Professionnelle
            </motion.h2>
            <div className="accordion-list">
              {experience.map((item, index) => (
                <AccordionItem key={item.id} item={item} index={index} total={experience.length} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Parcours ── */}
      <section className="section">
        <div className="parcours-page">
          <motion.div
            className="parcours-content"
            variants={profilContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            <motion.h2 className="parcours-title" variants={profilItem}>
              Parcours
            </motion.h2>
            <div className="accordion-list">
              {parcours.map((item, index) => (
                <AccordionItem key={item.id} item={item} index={index} total={parcours.length} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  )
}
