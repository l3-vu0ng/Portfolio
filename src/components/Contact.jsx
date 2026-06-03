import { motion } from 'framer-motion';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="contact__inner">
        <div className="contact__grid">
          {/* Left */}
          <motion.div
            className="contact__left"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="mono contact__label" style={{ color: 'var(--accent)' }}>
              // CONTACT
            </span>
            <h2 className="contact__heading">
              Have a project?<br />Let&apos;s talk!
            </h2>
            <a href="mailto:hello@levuong.dev" className="btn btn--accent mono" style={{ marginTop: '1rem' }}>
              Submit
            </a>
          </motion.div>

          {/* Right: Form */}
          <motion.form
            className="contact__form"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="form-group">
              <input type="text" placeholder="Name" className="form-input" />
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email" className="form-input" />
            </div>
            <div className="form-group">
              <textarea placeholder="Message" rows="5" className="form-input form-textarea" />
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
