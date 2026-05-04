import React from "react";

const TradeSection = () => {
  return (
    <section style={styles.tradeSection}>
      {/* Ellipse Background */}
      <div style={styles.ellipseBg}></div>

      {/* White Card */}
      <div style={styles.tradeCard}>
        {/* Image */}
        <div style={styles.tradeImage}></div>

        {/* Title */}
        <h2 style={styles.tradeTitle}>Trade anytime, anywhere</h2>

        {/* Description */}
        <p style={styles.tradeDesc}>
          Ever thought real estate, gold, or fine art was only for the rich? Not
          anymore. Start with small amounts and own a piece of high-value assets
          you actually care about.
        </p>
      </div>
    </section>
  );
};

export default TradeSection;

const styles = {
  tradeSection: {
    position: "relative",
    width: "100%",
    minHeight: "2500px",
    background: "#FFFFFF",
    overflow: "hidden",
  },
  ellipseBg: {
    position: "absolute",
    width: "1803px",
    height: "1900px",
    left: "-926px",
    top: "1100px",
    background:
      "radial-gradient(38.62% 38.62% at 50.04% 61.38%, #ACE0CC 0%, #E7F7F1 0%, #FFFFFF 100%)",
    zIndex: 0,
  },
  tradeCard: {
    position: "absolute",
    width: "587px",
    height: "719px",
    left: "353px",
    top: "2281px",
    background: "#FFFFFF",
    boxShadow: "0px 4px 25.5px rgba(0, 0, 0, 0.25)",
    borderRadius: "61px",
    padding: "40px",
    boxSizing: "border-box",
    zIndex: 1,
  },
  tradeImage: {
    position: "absolute",
    width: "232px",
    height: "317px",
    left: "530px",
    top: "2281px",
    background: "url('/assets/image43.png') no-repeat center/cover",
    zIndex: 2,
  },
  tradeTitle: {
    position: "absolute",
    width: "496px",
    height: "47px",
    left: "calc(50% - 496px / 2 - 1053px)",
    top: "2605px",
    fontFamily: "'DM Sans', sans-serif",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "36px",
    lineHeight: "47px",
    color: "#15A36E",
  },
  tradeDesc: {
    position: "absolute",
    width: "478px",
    height: "252px",
    left: "408px",
    top: "2680px",
    fontFamily: "'DM Sans', sans-serif",
    fontStyle: "normal",
    fontWeight: 400,
    fontSize: "32px",
    lineHeight: "42px",
    color: "#000000",
  },
};
