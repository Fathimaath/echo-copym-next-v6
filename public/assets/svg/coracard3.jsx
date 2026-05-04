import React from 'react';

const PortfolioEventsCard = () => {
  const styles = `
    .portfolio-events-card {
      background: linear-gradient(135deg, rgba(26, 32, 44, 0.9), rgba(15, 23, 42, 0.9));
      backdrop-filter: blur(10px);
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
      padding: 24px;
      width: 380px;
      max-width: 100%;
      margin: 20px auto;
      position: relative;
      border: 1px solid rgba(96, 165, 250, 0.2);
      color: #e2e8f0;
      font-family: 'Inter', sans-serif;
      overflow: hidden;
    }

    .portfolio-events-card h2 {
      margin: 0 0 20px;
      font-size: 1.3rem;
      font-weight: 600;
      color: #f1f5f9;
      letter-spacing: -0.02em;
    }

    .portfolio-events-card .card-content {
      display: flex;
      align-items: flex-start;
      gap: 20px;
    }

    .portfolio-events-card .left-section {
      flex: 1;
      text-align: center;
    }

    .portfolio-events-card .count {
      font-size: 2.4rem;
      font-weight: 700;
      color: #ffffff;
      text-shadow: 0 0 8px rgba(126, 182, 255, 0.4);
    }

    .portfolio-events-card .label {
      font-size: 0.85rem;
      color: #94a3b8;
      margin-top: 4px;
    }

    .portfolio-events-card .divider {
      width: 1px;
      height: 80%;
      background: rgba(96, 165, 250, 0.2);
    }

    .portfolio-events-card .right-section {
      flex: 2;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .portfolio-events-card .event-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px 0;
      border-bottom: 1px solid rgba(255, 255, 255, 0.05);
      transition: all 0.2s ease;
    }

    .portfolio-events-card .event-item:last-child {
      border-bottom: none;
    }

    .portfolio-events-card .event-item:hover {
      background: rgba(96, 165, 250, 0.08);
      border-radius: 6px;
    }

    .portfolio-events-card .icon-container {
      width: 32px;
      height: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
      background: rgba(59, 130, 246, 0.2);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .portfolio-events-card .icon {
      font-size: 1.1rem;
      font-weight: bold;
      color: #60a5fa;
    }

    .portfolio-events-card .symbol {
      font-size: 0.95rem;
      font-weight: 500;
      color: #f8fafc;
    }

    .portfolio-events-card .tag {
      padding: 4px 10px;
      border-radius: 12px;
      font-size: 0.75rem;
      font-weight: 500;
      border: 1px solid transparent;
    }

    .portfolio-events-card .tag.update {
      background: rgba(59, 130, 246, 0.2);
      border-color: #3b82f6;
      color: #93c5fd;
    }

    .portfolio-events-card .tag.alert {
      background: rgba(249, 115, 22, 0.2);
      border-color: #f97316;
      color: #fb923c;
    }

    .portfolio-events-card .tag.insight {
      background: rgba(16, 185, 129, 0.2);
      border-color: #10b981;
      color: #34d399;
    }

    .portfolio-events-card .close-button {
      position: absolute;
      top: 12px;
      right: 12px;
      width: 30px;
      height: 30px;
      background: rgba(255, 255, 255, 0.08);
      border: none;
      border-radius: 50%;
      color: #94a3b8;
      font-size: 1.2rem;
      cursor: pointer;
      transition: all 0.2s ease;
    }

    .portfolio-events-card .close-button:hover {
      background: rgba(255, 255, 255, 0.15);
      color: #e2e8f0;
    }
  `;

  const events = [
    { symbol: 'CORA AI', icon: 'AI', type: 'Update' },
    { symbol: 'DATAFLOW', icon: 'D', type: 'Alert' },
    { symbol: 'INSIGHT-9', icon: 'I', type: 'Insight' }
  ];

  return (
    <div className="portfolio-events-card">
      {/* Inject CSS */}
      <style>{styles}</style>

      {/* Content */}
      <h2>Recent AI Events</h2>

      <div className="card-content">
        <div className="left-section">
          <div className="count">12</div>
          <div className="label">Today</div>
        </div>

        <div className="divider"></div>

        <div className="right-section">
          {events.map((event, index) => (
            <div key={index} className="event-item">
              <div className="icon-container">
                <span className="icon">{event.icon}</span>
              </div>
              <div className="symbol">{event.symbol}</div>
              <div className={`tag ${event.type.toLowerCase()}`}>{event.type}</div>
            </div>
          ))}
        </div>
      </div>

      <button className="close-button">×</button>
    </div>
  );
};

export default PortfolioEventsCard;