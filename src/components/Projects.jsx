import { motion } from 'framer-motion';
import './Projects.css';

const projects = [
  {
    title: 'Battleship',
    techs: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    desc: 'Used components of JavaScript to implement basic data structures through the game of Battleship. Used a terminal to display ships and tracked where ships are hit or missed.',
    img: '/project_battleship.png',
    github: '#',
    live: '#',
  },
  {
    title: 'Movie Titles API',
    techs: ['HTML', 'CSS', 'JavaScript', 'API', 'Version Control'],
    desc: 'Uses a public movie API to build a collection movie list that sorts from A to Z or vice versa. It also counts how many movies in each container and adds user\'s favorite movies.',
    img: '/project_movie.png',
    github: '#',
    live: '#',
  },
  {
    title: 'JavaScript Calculator',
    techs: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    desc: 'Uses simple algorithm concepts in JavaScript to produce an arithmetic result in a terminal. Features a clean glassmorphism UI with keyboard support.',
    img: '/project_calculator.png',
    github: '#',
    live: '#',
  },
  {
    title: 'SaaS Landing Page',
    techs: ['HTML', 'CSS'],
    desc: 'Used HTML concepts such as creating a form and a basic skeleton. It also used components of both the grid and flexbox elements to produce a landing page.',
    img: '/project_landing.png',
    github: '#',
    live: '#',
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

const Projects = () => {
  return (
    <section className="projects" id="projects">
      <div className="projects__inner">
        <motion.h2
          className="projects__heading"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Projects
        </motion.h2>

        <div className="projects__list">
          {projects.map((project, i) => (
            <motion.article
              key={i}
              className={`project-card ${i % 2 === 1 ? 'project-card--reverse' : ''}`}
              variants={cardVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
            >
              <div className="project-card__image-wrap">
                <img
                  src={project.img}
                  alt={project.title}
                  className="project-card__image"
                />
              </div>

              <div className="project-card__info">
                <h3 className="project-card__title">{project.title}</h3>
                <div className="project-card__techs">
                  {project.techs.map((t, j) => (
                    <span key={j} className="pill">{t}</span>
                  ))}
                </div>
                <p className="project-card__desc">{project.desc}</p>
                <div className="project-card__actions">
                  <a href={project.github} className="btn btn--accent mono">View Github</a>
                  <a href={project.live} className="btn btn--outline mono">View project ↗</a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
