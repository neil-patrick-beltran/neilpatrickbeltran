import './App.css'

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

const currentYear = new Date().getFullYear()

function App() {
  return (
    <div className="portfolio">
      <header className="hero" id="top">
        <p className="eyebrow">Portfolio</p>
        <h1>Hi, I&apos;m Neil Patrick Beltran</h1>
        <p className="intro">
          I build modern web experiences with React, focused on clean UI, strong usability,
          and reliable performance.
        </p>
        <div className="hero-actions">
          <a href="#projects">View Projects</a>
          <a href="#contact" className="secondary">
            Contact Me
          </a>
        </div>
      </header>

      <main>
        <section className="section" id="about">
          <h2>About</h2>
          <p>
            I&apos;m a front-end developer who enjoys turning ideas into responsive, accessible
            interfaces. I care about maintainable code and thoughtful user experiences.
          </p>
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
