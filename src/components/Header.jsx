import React from 'react';
import { motion } from 'framer-motion';
import { contacts } from '../data/projects';
import './Header.css';

const Header = () => {
  return (
    <motion.header 
      className="header"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <div className="header-pattern"></div>
      
      <div className="header-content">
        <motion.div 
          className="contact-info"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <a 
            href={`mailto:${contacts.email}`} 
            className="contact-link"
          >
            {contacts.email}
          </a>
          
          <a 
            href={`https://t.me/${contacts.telegram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            {contacts.telegram}
          </a>
          
          <a 
            href={`https://${contacts.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link"
          >
            LinkedIn
          </a>
        </motion.div>
      </div>
    </motion.header>
  );
};

export default Header;
