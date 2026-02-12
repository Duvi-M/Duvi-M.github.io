---
layout: page
title: ""
permalink: /
---

<div class="hero">
  <div class="hero-badge">Research · Engineering · Practical ML</div>

  <h1 class="hero-title">ML and Data Science with Duvan</h1>

  <p class="hero-subtitle">
    Machine Learning Researcher &amp; Data Engineer<br/>
    Exploring AI, LoRA fine-tuning, model evaluation, and real-world data systems.
  </p>

  <div class="hero-actions">
    <a class="btn btn-primary" href="/projects/">View Projects</a>
    <a class="btn btn-secondary" href="/roadmap/">Open Roadmap</a>
  </div>

  <div class="hero-tags">
    <span class="tag">LoRA</span>
    <span class="tag">Transformers</span>
    <span class="tag">Metrics</span>
    <span class="tag">ETL</span>
    <span class="tag">Kaggle</span>
  </div>
</div>

## Start here
- **Projects:** see what I’m building → /projects
- **Roadmap:** my learning path and checkpoints → /roadmap
- **Resources:** curated links (YouTube, books, papers) → /resources

## Latest posts
<ul class="post-list">
{% for post in site.posts limit:5 %}
  <li>
    <span class="post-meta">{{ post.date | date: "%b %-d, %Y" }}</span><br>
    <a class="post-link" href="{{ post.url }}">{{ post.title }}</a>
  </li>
{% endfor %}
</ul>