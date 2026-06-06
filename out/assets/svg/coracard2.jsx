import React from 'react';

const AboutUs = () => {
  const styles = {
    card: {
  backgroundColor: 'rgba(15, 1, 1, 0.92)', // Semi-transparent black
  backdropFilter: 'blur(10px)',             // Key for glassmorphism
  WebkitBackdropFilter: 'blur(10px)',       // For Safari support
  borderRadius: '16px',                     // Slightly softer radius
  padding: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 0 10px rgba(255, 255, 255, 0.05)', // Deeper outer + subtle inner glow
  color: 'white',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  maxWidth: '350px',
  margin: '20px auto',
  border: '1px solid rgba(0, 0, 0, 0.88)', // Optional: adds a subtle border for definition
},
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '16px',
    },
    title: {
      margin: '0',
      fontSize: '18px',
      fontWeight: '500',
    },
    diversifyButton: {
      backgroundColor: 'transparent',
      border: '1px solid #ffffff',
      color: 'white',
      padding: '6px 16px',
      borderRadius: '20px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
    },
    progressBarContainer: {
      margin: '16px 0',
      height: '12px',
      backgroundColor: '#2d2d2d',
      borderRadius: '6px',
      overflow: 'hidden',
    },
    progressBar: {
      display: 'flex',
      height: '100%',
      width: '100%',
    },
    segmentTech: {
      width: '77.34%',
      backgroundColor: '#00a12bff',
      height: '100%',
      borderRadius: '6px 0 0 6px',
    },
    segmentRealEstate: {
      width: '10.96%',
      backgroundColor: '#00539bff',
      height: '100%',
    },
    segmentOther: {
      width: '11.7%',
      backgroundColor: '#877f82ff',
      height: '100%',
      borderRadius: '0 6px 6px 0',
    },
    portfolioItems: {
      marginTop: '12px',
    },
    item: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 0',
      borderBottom: '1px solid #2d2d2d',
    },
    category: {
      fontSize: '14px',
      opacity: 0.8,
    },
    percentage: {
      fontSize: '14px',
      fontWeight: '500',
    },
    arrow: {
      fontSize: '14px',
      opacity: 0.6,
    },
  };

  return (
    <div style={styles.card}>
      {/* Header */}
      <div style={styles.header}>
        <h3 style={styles.title}>Your portfolio breakdown</h3>
        <button style={styles.diversifyButton}>Diversify</button>
      </div>

      {/* Progress Bar */}
      <div style={styles.progressBarContainer}>
        <div style={styles.progressBar}>
          <div style={styles.segmentTech}></div>
          <div style={styles.segmentRealEstate}></div>
          <div style={styles.segmentOther}></div>
        </div>
      </div>

      {/* Portfolio Items */}
      <div style={styles.portfolioItems}>
        <div style={styles.item}>
          <span style={styles.category}>Technology</span>
          <span style={styles.percentage}>67.34%</span>
          <span style={styles.arrow}>›</span>
        </div>
        <div style={styles.item}>
          <span style={styles.category}>Real Estate</span>
          <span style={styles.percentage}>10.96%</span>
          <span style={styles.arrow}>›</span>
        </div>
        <div style={styles.item}>
          <span style={styles.category}>Digital Art</span>
          <span style={styles.percentage}>11.96%</span>
          <span style={styles.arrow}>›</span>
        </div>
      </div>
    </div>
  );
};
export default AboutUs;