import { useEffect, useState } from 'react'
import './App.css'

const THEME_STORAGE_KEY = 'portfolio-theme'

function getStoredTheme() {
  if (typeof window === 'undefined') return null

  try {
    const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
    return storedTheme === 'light' || storedTheme === 'dark' ? storedTheme : null
  } catch {
    return null
  }
}

function getDeviceTheme() {
  return typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function getInitialTheme() {
  const storedTheme = getStoredTheme()
  return {
    theme: storedTheme ?? getDeviceTheme(),
    isUserSelected: storedTheme !== null,
  }
}

function saveTheme(theme) {
  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    return false
  }
  return true
}

const projects = [
  {
    title: 'dtr-ar',
    description: 'A digital time record project.',
  },
  {
    title: 'RfidTagging',
    description: 'An RFID tagging project.',
  },
  {
    title: 'mtop',
    description: 'A project named mtop.',
  },
]

const experience = [
  {
    company: 'Lancesoft Inc.',
    dates: '2025–Present',
    title: 'Software Engineer',
    summary:
      'Builds and maintains software applications, contributing across implementation, testing, and ongoing improvements.',
    mark: 'L',
    markClass: 'lancesoft-mark',
  },
  {
    company: 'Vertere Global Solutions',
    dates: '2023–2025',
    title: 'Programmer Analyst II',
    summary:
      'Analyzed business needs and developed, enhanced, and supported software solutions.',
    mark: 'VG',
    markClass: 'vertere-mark',
  },
  {
    company: 'City Government of San Pablo',
    dates: '2020–2023',
    title: 'Programmer',
    summary:
      'Developed and maintained software applications to support the city government’s operations.',
    mark: 'SP',
    markClass: 'san-pablo-mark',
  },
]

const currentYear = new Date().getFullYear()

function App() {
  const [themePreference, setThemePreference] = useState(getInitialTheme)
  const { theme } = themePreference

  useEffect(() => {
    if (themePreference.isUserSelected) return undefined

    const mediaQuery = window.matchMedia?.('(prefers-color-scheme: dark)')
    if (!mediaQuery) return undefined

    const updateTheme = (event) => {
      setThemePreference({
        theme: event.matches ? 'dark' : 'light',
        isUserSelected: false,
      })
    }

    mediaQuery.addEventListener?.('change', updateTheme)
    return () => mediaQuery.removeEventListener?.('change', updateTheme)
  }, [themePreference.isUserSelected])

  function selectTheme(nextTheme) {
    saveTheme(nextTheme)
    setThemePreference({ theme: nextTheme, isUserSelected: true })
  }

  return (
    <div className={`portfolio ${theme === 'dark' ? 'theme-dark' : ''}`}>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="hero" id="top">
        <div className="hero-header">
          <p className="eyebrow">Portfolio</p>
          <div className="theme-toggle" role="group" aria-label="Color theme">
            <button
              type="button"
              className={theme === 'light' ? 'active' : ''}
              aria-pressed={theme === 'light'}
              onClick={() => selectTheme('light')}
            >
              Light
            </button>
            <button
              type="button"
              className={theme === 'dark' ? 'active' : ''}
              aria-pressed={theme === 'dark'}
              onClick={() => selectTheme('dark')}
            >
              Dark
            </button>
          </div>
        </div>
        <div className="hero-copy">
          <h1>Hi, I&apos;m Neil Patrick Beltran</h1>
          <p className="intro">
            I&apos;m a versatile full-stack software engineer building end-to-end applications with{' '}
            <span className="technology">Spring Boot</span>, <span className="technology">Gin</span>,
            and <span className="technology">Express.js</span> on the back end, and{' '}
            <span className="technology">React</span>, <span className="technology">jQuery</span>,
            and <span className="technology">Angular</span> on the front end.
          </p>
          <div className="hero-actions">
            <a href="#projects">View Projects</a>
            <a href="#contact" className="secondary">
              Contact Me
            </a>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="section" id="experience">
          <h2>Work Experience</h2>
          <div className="experience-list">
            {experience.map((role) => (
              <article className="experience-card" key={role.company}>
                <div className={`company-mark ${role.markClass}`} aria-hidden="true">
                  {role.mark}
                </div>
                <div className="experience-content">
                  <div className="experience-heading">
                    <div>
                      <h3>{role.company}</h3>
                      <p className="experience-title">{role.title}</p>
                    </div>
                    <p className="experience-dates">{role.dates}</p>
                  </div>
                  <p className="experience-summary">{role.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="projects">
          <h2>Featured Projects</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <article key={project.title} className="project-card">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="contact">
          <h2>Contact</h2>
          <ul className="contact-list">
            <li>
              Email: <a href="mailto:neil.patrick.beltran@gmail.com">neil.patrick.beltran@gmail.com</a>
            </li>
            <li>
              Phone: <a href="tel:+639524528668">+63 952 452 8668</a>
            </li>
            <li>
              LinkedIn:{' '}
              <a href="https://www.linkedin.com/in/neil-patrick-beltran" target="_blank" rel="noreferrer">
                neil-patrick-beltran
              </a>
            </li>
          </ul>
        </section>
      </main>

      <footer>
        <p>© {currentYear} Neil Patrick Beltran</p>
        <a href="#top">Back to top</a>
      </footer>
    </div>
  )
}

export default App
