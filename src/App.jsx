import './App.css'

const projects = [
  {
    title: 'Marketing Website Refresh',
    description:
      'A responsive redesign focused on performance, accessibility, and clearer product storytelling.',
    stack: 'React · Vite · CSS',
  },
  {
    title: 'Task Tracker Dashboard',
    description:
      'A productivity dashboard with drag-and-drop workflows and quick progress insights for teams.',
    stack: 'React · TypeScript · REST API',
  },
  {
    title: 'E-commerce Landing Page',
    description:
      'A conversion-focused storefront page with reusable UI sections and clean, modern visuals.',
    stack: 'React · JavaScript · Responsive Design',
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
                <span>{project.stack}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="contact">
          <h2>Contact</h2>
          <p>
            Want to collaborate or chat about opportunities? Connect with me on{' '}
            <a href="https://github.com/neil-patrick-beltran" target="_blank" rel="noreferrer noopener">GitHub (opens in a new tab)</a>.
          </p>
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
