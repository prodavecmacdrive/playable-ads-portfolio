import React from 'react';
import { motion } from 'framer-motion';
import { pdfPath } from '../data/projects';
import './PDFSection.css';

const PDFSection = ({ onDownload }) => {
  const handleDownload = () => {
    if (onDownload) {
      onDownload();
    }
  };

  return (
    <section className="pdf-section">
      <motion.div 
        className="pdf-container"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="resume-text-container">
          <p className="resume-text">
            Perhaps I didn't send you my resume along with the link to this portfolio, and you're looking for it. You can download it here.
          </p>
          <a 
            href={pdfPath} 
            download="Oleh_Vasyliev_Resume.pdf" 
            className="download-button"
            onClick={handleDownload}
          >
            Download Resume
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default PDFSection;
