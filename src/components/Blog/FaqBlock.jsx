import React from 'react';

export default function FaqBlock({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <div className="blog-block blog-faq-accordion">
      <h3 className="blog-faq-heading">Frequently Asked Questions</h3>
      {items.map((item, i) => (
        <div className="blog-faq-item" key={i}>
          <div className="blog-faq-question">{item.question}</div>
          <div className="blog-faq-answer">{item.answer}</div>
        </div>
      ))}
    </div>
  );
}
