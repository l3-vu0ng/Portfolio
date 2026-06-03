import './TechMarquee.css';

const techs = ['HTML5', 'CSS3', 'JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Git', 'Docker', 'PostgreSQL'];

const TechMarquee = () => {
  // Duplicate for seamless infinite scroll
  const items = [...techs, ...techs];

  return (
    <section className="marquee">
      <div className="marquee__track">
        {items.map((tech, i) => (
          <span key={i} className="marquee__item mono">{tech}</span>
        ))}
      </div>
    </section>
  );
};

export default TechMarquee;
