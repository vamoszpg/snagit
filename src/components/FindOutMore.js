import React from 'react';
import { Link } from 'react-router-dom';
import styles from './FindOutMore.module.css';

const FindOutMore = () => {
  return (
    <div className={styles.findOutMorePage}>
      <div className={styles.findOutMoreContent}>
        <h1 className={styles.title}>Discover Snag<span>It</span></h1>
        <p className={styles.tagline}>Revolutionizing Defect Management</p>
        
        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>What We Offer</h2>
          <ul className={styles.featuresList}>
            <li><i className="fas fa-camera"></i> Photo capture & categorization</li>
            <li><i className="fas fa-file-pdf"></i> PDF report generation</li>
            <li><i className="fas fa-envelope"></i> Email report sharing</li>
            <li><i className="fas fa-tasks"></i> Workflow management</li>
            <li><i className="fas fa-chart-line"></i> Progress tracking</li>
            <li><i className="fas fa-upload"></i> Multimedia uploads</li>
          </ul>
        </section>

        <section className={styles.contentSection}>
          <h2 className={styles.sectionTitle}>Why Choose SnagIt?</h2>
          <ul className={styles.benefitsList}>
            <li><i className="fas fa-home"></i> SnagIt modernizes property defect logging for homeowners and professionals.</li>
            <li><i className="fas fa-cogs"></i> Our app efficiently captures, categorizes, and manages issues, filling a crucial market gap.</li>
            <li><i className="fas fa-sync-alt"></i> With SnagIt, you can streamline your workflow, enhance communication, and ensure that every defect is logged and addressed promptly.</li>
          </ul>
        </section>

        <section className={`${styles.contentSection} ${styles.cta}`}>
          <h2 className={styles.sectionTitle}>Ready to Transform Your Workflow?</h2>
          <Link to="/" className={styles.ctaButton}>Get SnagIt Now</Link>
        </section>
      </div>
    </div>
  );
};

export default FindOutMore;
