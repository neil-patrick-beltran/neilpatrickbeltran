import { useEffect, useState } from 'react'
import './App.css'
import { experience, projects } from './portfolioData'

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

function getInitialTheme() {
  const storedTheme = getStoredTheme()
  return {
    theme: storedTheme ?? 'dark',
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

const currentYear = new Date().getFullYear()

function CompanyLogo({ type }) {
  if (type === 'lancesoft') {
    return (
      <svg viewBox="0 0 48 48" focusable="false">
        <rect x="6" y="6" width="36" height="36" rx="2" fill="currentColor" />
        <path d="M12 39 38 9" stroke="var(--surface)" strokeWidth="4" />
      </svg>
    )
  }

  if (type === 'vertere') {
    return (
      <svg viewBox="0 0 48 48" focusable="false">
        <path d="M34.8 11.8a16.5 16.5 0 0 0-23 23M14 37.3a16.5 16.5 0 0 0 22.8-22.8" />
        <path d="M12 37 22 16l16-8-8 16-18 13Z" fill="currentColor" stroke="none" />
        <path d="m22 16 16-8-8 16-10 1.5Z" fill="var(--primary-strong)" stroke="none" />
      </svg>
    )
  }

  return (
    <span className="san-pablo-seal" />
  )
}

function App() {
  const [themePreference, setThemePreference] = useState(getInitialTheme)
  const { theme } = themePreference
  const [activeProject, setActiveProject] = useState(null)
  const ActiveModal = activeProject?.modal

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

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
          <p className="eyebrow">Software Engineer</p>
          <button
            type="button"
            className="theme-toggle"
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            onClick={() => selectTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              {theme === 'dark' ? (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </>
              ) : (
                <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
              )}
            </svg>
          </button>
        </div>
        <div className="hero-main">
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
          <div className="hero-profile" role="img" aria-label="Neil Patrick Beltran" />
        </div>
      </header>

      <main id="main-content">
        <section className="section" id="experience">
          <h2>Work Experience</h2>
          <div className="experience-list">
            {experience.map((role) => (
              <article className="experience-card" key={role.company}>
                <div className="company-logo" aria-hidden="true">
                  <CompanyLogo type={role.logo} />
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
                {project.builtWith?.length > 0 && (
                  <div className="tech">
                    <ul className="tech-list">
                      {project.builtWith.map((tech) => (
                        <li key={tech}>{tech}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <button
                  type="button"
                  className="project-button"
                  onClick={() => setActiveProject(project)}
                >
                  View Project
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="contact">
          <h2>Contact</h2>
          <ul className="contact-list">
            <li>
              <a
                href="mailto:neil.patrick.beltran@gmail.com"
                aria-label="Email Neil Patrick Beltran: neil.patrick.beltran@gmail.com"
                title="Email"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M3 5.5h18v13H3z" />
                  <path d="m3.5 6 8.5 7 8.5-7" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="tel:+639524528668"
                aria-label="Call Neil Patrick Beltran: +63 952 452 8668"
                title="Phone"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M7.1 3.5 10 7.7 8.2 9.5a15 15 0 0 0 6.3 6.3l1.8-1.8 4.2 2.9-.8 3.1c-.2.7-.9 1.1-1.6 1.1C10 20.4 3.6 14 2.9 5.9c-.1-.7.4-1.4 1.1-1.6z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/neil-patrick-beltran"
                target="_blank"
                rel="noreferrer"
                aria-label="Neil Patrick Beltran on LinkedIn"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm3.2 6.1a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8ZM6 18h2.5v-7H6Zm4.2 0h2.5v-3.5c0-.9.2-1.8 1.3-1.8s1.1 1 1.1 1.9V18h2.5v-3.9c0-2.4-.5-4.2-3.2-4.2a2.8 2.8 0 0 0-2.5 1.4h-.1V10h-2.4Z" />
                </svg>
              </a>
            </li>
            <li>
              <a
                href="https://github.com/neil-patrick-beltran"
                target="_blank"
                rel="noreferrer"
                aria-label="Neil Patrick Beltran on GitHub"
                title="GitHub"
              >
                <svg className="github-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                  <path d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.32-3.76-1.32-.5-1.29-1.24-1.63-1.24-1.63-1.01-.69.08-.67.08-.67 1.12.08 1.71 1.15 1.71 1.15.99 1.7 2.6 1.21 3.23.93.1-.72.39-1.21.71-1.49-2.47-.28-5.06-1.24-5.06-5.5 0-1.21.43-2.2 1.15-2.97-.12-.28-.5-1.41.11-2.94 0 0 .94-.3 3.05 1.13a10.6 10.6 0 0 1 5.56 0c2.12-1.43 3.05-1.13 3.05-1.13.61 1.53.23 2.66.12 2.94.71.77 1.14 1.76 1.14 2.97 0 4.27-2.59 5.21-5.07 5.49.4.34.76 1.02.76 2.06v3.08c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" />
                </svg>
              </a>
            </li>
          </ul>
        </section>
      </main>

      {ActiveModal && (
        <ActiveModal project={activeProject} onClose={() => setActiveProject(null)} />
      )}

      <footer>
        <p>© {currentYear} Neil Patrick Beltran</p>
        <a href="#top">Back to top</a>
      </footer>
    </div>
  )
}

export default App
