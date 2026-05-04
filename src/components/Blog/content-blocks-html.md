# Blog Insertable Content Blocks — HTML Snippets

Paste these HTML snippets directly into the **admin dashboard content editor** to add styled content blocks inside blog articles.

---

## 1. CTA Block (Call to Action)

```html
<div class="blog-block blog-cta">
  <h3 class="blog-cta__title">Start Your Tokenization Journey</h3>
  <p class="blog-cta__text">Explore our platform and discover how CopyM makes tokenization simple, secure, and accessible.</p>
  <a href="/tokenization" class="blog-cta__btn">
    Explore Platform
    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path></svg>
  </a>
</div>
```

**Variants:** Change the outer class:
- Dark (default): `blog-cta`
- Green: add `style="background: linear-gradient(135deg, #15a36e, #059669);"`
- With glow: keep default (has built-in glow effect)

---

## 2. Fast Fact / Key Fact Block

```html
<div class="blog-block blog-fast-fact">
  <div class="blog-fast-fact__label">
    ⚡ Fast Fact
  </div>
  <p class="blog-fast-fact__value">The tokenized asset market is projected to reach $16 trillion by 2030.</p>
</div>
```

---

## 3. Quote Block

```html
<div class="blog-block blog-quote">
  <p class="blog-quote__text">"Tokenization will fundamentally change how assets are bought, sold, and managed worldwide."</p>
  <div class="blog-quote__author">
    <div class="blog-quote__avatar">C</div>
    <div>
      <div class="blog-quote__name">John Doe</div>
      <div class="blog-quote__role">CEO, CopyM</div>
    </div>
  </div>
</div>
```

**With image avatar:** Replace `C` inside `blog-quote__avatar` with:
```html
<img src="/path/to/avatar.jpg" alt="John Doe" />
```

---

## 4. Callout Block

### Info
```html
<div class="blog-block blog-callout blog-callout--info">
  <div class="blog-callout__icon">
    <svg class="blog-callout__icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path></svg>
  </div>
  <div class="blog-callout__content">
    <div class="blog-callout__title">Did You Know?</div>
    <p class="blog-callout__text">Over 60% of institutional investors plan to allocate to digital assets by 2027.</p>
  </div>
</div>
```

### Warning
```html
<div class="blog-block blog-callout blog-callout--warning">
  <div class="blog-callout__icon">
    <svg class="blog-callout__icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
  </div>
  <div class="blog-callout__content">
    <div class="blog-callout__title">Important</div>
    <p class="blog-callout__text">Always verify regulatory compliance before investing in tokenized assets.</p>
  </div>
</div>
```

### Note
```html
<div class="blog-block blog-callout blog-callout--note">
  <div class="blog-callout__icon">
    <svg class="blog-callout__icon" fill="currentColor" viewBox="0 0 20 20"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path><path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
  </div>
  <div class="blog-callout__content">
    <div class="blog-callout__title">Note</div>
    <p class="blog-callout__text">This feature is currently in beta and will be available to all users soon.</p>
  </div>
</div>
```

### Success
```html
<div class="blog-block blog-callout blog-callout--success">
  <div class="blog-callout__icon">
    <svg class="blog-callout__icon" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
  </div>
  <div class="blog-callout__content">
    <div class="blog-callout__title">Success</div>
    <p class="blog-callout__text">CopyM has successfully tokenized over $500M in real-world assets.</p>
  </div>
</div>
```

---

## 5. Table Block

```html
<div class="blog-block blog-table">
  <table>
    <thead>
      <tr>
        <th>Feature</th>
        <th>Traditional</th>
        <th>Tokenized</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Minimum Investment</td>
        <td>$100,000+</td>
        <td>As low as $100</td>
      </tr>
      <tr>
        <td>Settlement Time</td>
        <td>30-90 days</td>
        <td>Minutes</td>
      </tr>
      <tr>
        <td>Liquidity</td>
        <td>Low</td>
        <td>High</td>
      </tr>
      <tr>
        <td>Transparency</td>
        <td>Limited</td>
        <td>Full (on-chain)</td>
      </tr>
    </tbody>
  </table>
</div>
```

---

## 6. Image + Caption Block

```html
<div class="blog-block blog-image">
  <img src="/assets/Images/your-image.jpg" alt="Description of the image" />
  <div class="blog-image__caption">Tokenized real estate portfolio dashboard — Source: CopyM</div>
</div>
```

---

## 7. Source / Reference Citation Block

```html
<div class="blog-block blog-source">
  <div class="blog-source__title">
    📎 Source
  </div>
  <a href="https://example.com/report" class="blog-source__link" target="_blank" rel="noopener noreferrer">
    Global Tokenization Report 2026 — McKinsey & Company
  </a>
</div>
```

**Multiple sources:**
```html
<div class="blog-block blog-source">
  <div class="blog-source__title">
    📎 Sources
  </div>
  <ul>
    <li><a href="https://example.com/1" class="blog-source__link" target="_blank" rel="noopener noreferrer">Source 1 Title</a></li>
    <li><a href="https://example.com/2" class="blog-source__link" target="_blank" rel="noopener noreferrer">Source 2 Title</a></li>
  </ul>
</div>
```

---

## 8. Related Article Inline Block

```html
<a href="/blog/understanding-rwa-tokenization" class="blog-block blog-related-article">
  <div class="blog-related-article__label">
    📰 Related Article
  </div>
  <div class="blog-related-article__title">Understanding Real-World Asset Tokenization</div>
  <div class="blog-related-article__meta">Education • March 15, 2026</div>
</a>
```

---

## Usage Tips

1. **Placement:** Paste any block between paragraphs in the article content editor
2. **Spacing:** Each block has built-in `margin: 2.5rem 0` — no extra spacing needed
3. **Responsive:** All blocks automatically adapt to mobile, tablet, and desktop
4. **Theme:** All blocks use the `#15a36e` green brand color consistently
5. **Mix & Match:** You can place multiple blocks in sequence — they stack cleanly
