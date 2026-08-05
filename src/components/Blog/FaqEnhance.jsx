"use client";
import React, { useEffect, useRef } from 'react';

const FAQ_TRIANGLE_SVG =
  '<svg width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 6L0 0V12L10 6Z" fill="currentColor"/></svg>';

/**
 * Turn static `.blog-faq-accordion` markup (editor output: items with a
 * `.blog-faq-question` div + `.blog-faq-answer` div) into an interactive
 * accordion that matches the copym.xyz homepage FAQ UI:
 *   - divider rows (border-bottom)
 *   - a clickable question row with a black triangle caret
 *   - collapsible answer panel
 * Idempotent: guarded by `data-faq-enhanced`, safe to call on every render.
 */
function enhanceFaqAccordions(root) {
  if (!root) return;
  const blocks = root.querySelectorAll('.blog-faq-accordion');
  if (blocks.length === 0) return;

  blocks.forEach((block) => {
    if (block.dataset.faqEnhanced) return;
    block.dataset.faqEnhanced = '1';

    const items = Array.from(block.querySelectorAll(':scope > .blog-faq-item'));
    if (items.length === 0) return;

    items.forEach((item, index) => {
      if (item.dataset.faqEnhanced) return;
      item.dataset.faqEnhanced = '1';

      const q = item.querySelector(':scope > .blog-faq-question');
      const a = item.querySelector(':scope > .blog-faq-answer');
      if (!q || !a) return;

      const qText = q.innerHTML;
      q.remove();

      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'blog-faq-toggle';
      button.setAttribute('aria-expanded', 'false');

      const qSpan = document.createElement('span');
      qSpan.className = 'blog-faq-question';
      qSpan.innerHTML = qText;

      const caret = document.createElement('span');
      caret.className = 'blog-faq-caret';
      caret.innerHTML = FAQ_TRIANGLE_SVG;

      button.appendChild(qSpan);
      button.appendChild(caret);

      const panel = document.createElement('div');
      panel.className = 'blog-faq-panel';

      item.insertBefore(button, a);
      item.insertBefore(panel, a);
      panel.appendChild(a);

      button.addEventListener('click', () => {
        const isOpen = item.classList.contains('is-open');
        items.forEach((it) => {
          it.classList.remove('is-open');
          const b = it.querySelector('.blog-faq-toggle');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          button.setAttribute('aria-expanded', 'true');
        }
      });

      if (index === 0) {
        item.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/**
 * Wraps article content (HTML or contentBlocks) and upgrades any FAQ blocks
 * inside it into clickable accordions after render.
 */
export default function FaqEnhance({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    enhanceFaqAccordions(ref.current);
  });

  return (
    <div ref={ref} className="blog-faq-enhance-root">
      {children}
    </div>
  );
}
