import React from 'react';
import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import './ProjectGrid.css';

const ProjectGrid = ({ onProjectClick }) => {
  return (
    <section className="projects-section">
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-card"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "200px" }}
            transition={{ 
              duration: 0.6, 
              delay: index * 0.1,
              ease: "easeOut"
            }}
            onClick={(e) => onProjectClick(project, e)}
          >
            <div className="project-image-wrapper">
              <img 
                src={project.screenshot} 
                alt={project.name}
                className="project-image"
                loading="lazy"
              />
              <div className="psychedelic-overlay"></div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default ProjectGrid;
