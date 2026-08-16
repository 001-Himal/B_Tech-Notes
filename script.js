/* ============================================================
   BTech Notes — Main Application Script
   Hash-based SPA router, Markdown rendering, search, themes.
   ============================================================ */

(function () {
  'use strict';

  // ─── State ─────────────────────────────────────────────────
  let subjectsData = null;
  let searchIndex = null;
  let searchIndexBuilding = false;
  let allExpanded = false;

  // ─── DOM Refs ──────────────────────────────────────────────
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const contentEl = $('#content');
  const sidebarNav = $('#sidebar-nav');
  const sidebarEl = $('#sidebar');
  const sidebarOverlay = $('#sidebar-overlay');
  const sidebarToggle = $('#sidebar-toggle');
  const searchTrigger = $('#search-trigger');
  const searchModal = $('#search-modal');
  const searchInput = $('#search-input');
  const searchResults = $('#search-results');
  const themeToggle = $('#theme-toggle');
  const outlineEl = $('#outline');
  const outlineList = $('#outline-list');
  const loadingBar = $('#loading-bar');

  // ─── Initialize ────────────────────────────────────────────
  async function init() {
    setupTheme();
    setupSidebar();
    setupSearch();
    setupPrintHooks();
    await loadSubjects();
    setupRouter();
    handleRoute();
  }

  // ─── Data Loading ──────────────────────────────────────────
  async function loadSubjects() {
    try {
      const res = await fetch('subjects.json');
      if (!res.ok) throw new Error('Failed to load subjects.json');
      subjectsData = await res.json();
    } catch (e) {
      console.error('Error loading subjects:', e);
      subjectsData = { subjects: [] };
    }
  }

  // ─── Router ────────────────────────────────────────────────
  function setupRouter() {
    window.addEventListener('hashchange', handleRoute);
  }

  function handleRoute() {
    const hash = location.hash || '#/';
    const path = hash.slice(2); // remove '#/'
    const parts = path.split('/').filter(Boolean);

    // Close mobile sidebar on navigation
    closeSidebar();

    if (parts.length === 0 || path === '') {
      renderHome();
    } else if (parts[0] === 'subject' && parts.length === 2) {
      renderSubject(parts[1]);
    } else if (parts[0] === 'subject' && parts.length === 3) {
      renderUnit(parts[1], parts[2]);
    } else {
      renderHome();
    }

    // Scroll to top
    window.scrollTo(0, 0);
  }

  // ─── Render: Home (Subject Listing) ────────────────────────
  function renderHome() {
    document.title = 'BTech Notes';
    updateSidebar(null, null);
    hideOutline();

    const subjects = subjectsData.subjects;
    let cardsHTML = '';
    for (const s of subjects) {
      const unitCount = s.units.length;
      const unitLabel = unitCount === 1 ? '1 unit' : `${unitCount} units`;
      cardsHTML += `
        <a href="#/subject/${s.id}" class="subject-card" id="card-${s.id}">
          <div class="subject-card-name">${esc(s.name)}</div>
          <div class="subject-card-meta">${unitLabel}</div>
        </a>`;
    }

    contentEl.innerHTML = `
      <div class="home-header">
        <h1>All Subjects</h1>
        <p>Select a subject to view its units and notes.</p>
      </div>
      <div class="subject-grid">${cardsHTML}</div>`;
  }

  // ─── Render: Subject (Unit Listing) ────────────────────────
  function renderSubject(subjectId) {
    const subject = subjectsData.subjects.find(s => s.id === subjectId);
    if (!subject) {
      renderNotFound('Subject not found.');
      return;
    }

    document.title = `${subject.name} — BTech Notes`;
    updateSidebar(subjectId, null);
    hideOutline();

    let unitsHTML = '';
    for (const u of subject.units) {
      unitsHTML += `
        <li class="unit-list-item">
          <a href="#/subject/${subject.id}/${u.id}" class="unit-list-link" id="unit-link-${u.id}">
            <span class="unit-list-title">${esc(u.title)}</span>
            <svg class="unit-list-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>
        </li>`;
    }

    contentEl.innerHTML = `
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="#/">Home</a>
        <span class="breadcrumbs-separator">›</span>
        <span class="breadcrumbs-current">${esc(subject.name)}</span>
      </nav>
      <div class="subject-header">
        <h1>${esc(subject.name)}</h1>
      </div>
      <ul class="unit-list">${unitsHTML}</ul>`;
  }

  // ─── Render: Unit (Markdown Content) ───────────────────────
  async function renderUnit(subjectId, unitId) {
    const subject = subjectsData.subjects.find(s => s.id === subjectId);
    if (!subject) { renderNotFound('Subject not found.'); return; }

    const unitIndex = subject.units.findIndex(u => u.id === unitId);
    const unit = subject.units[unitIndex];
    if (!unit) { renderNotFound('Unit not found.'); return; }

    document.title = `${unit.title} — ${subject.name} — BTech Notes`;
    updateSidebar(subjectId, unitId);

    // Show loading
    showLoading();
    contentEl.innerHTML = `
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="#/">Home</a>
        <span class="breadcrumbs-separator">›</span>
        <a href="#/subject/${subjectId}">${esc(subject.name)}</a>
        <span class="breadcrumbs-separator">›</span>
        <span class="breadcrumbs-current">${esc(unit.title)}</span>
      </nav>
      <div class="unit-subject-label">${esc(subject.name)}</div>
      <h1 class="unit-title">${esc(unit.title)}</h1>
      <div style="padding:2rem 0;color:var(--text-tertiary);font-size:0.875rem;">Loading notes…</div>`;

    // Fetch markdown
    const mdUrl = `subjects/${subjectId}/${unitId}.md`;
    let mdContent = '';
    try {
      const res = await fetch(mdUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      mdContent = await res.text();
    } catch (e) {
      console.error('Error loading markdown:', e);
      hideLoading();
      contentEl.innerHTML = `
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="#/">Home</a>
          <span class="breadcrumbs-separator">›</span>
          <a href="#/subject/${subjectId}">${esc(subject.name)}</a>
          <span class="breadcrumbs-separator">›</span>
          <span class="breadcrumbs-current">${esc(unit.title)}</span>
        </nav>
        <div class="unit-subject-label">${esc(subject.name)}</div>
        <h1 class="unit-title">${esc(unit.title)}</h1>
        <div style="padding:2rem 0;color:var(--text-tertiary);">
          <p>Notes file not found.</p>
          <p style="font-size:0.8125rem;margin-top:0.5rem;">Expected: <code>${esc(mdUrl)}</code></p>
        </div>`;
      return;
    }

    // Parse markdown
    const htmlContent = marked.parse(mdContent);

    // Split into header + topics
    const { headerHTML, topicsHTML, topicTitles } = splitIntoTopics(htmlContent);

    // Build prev/next navigation
    const prevUnit = unitIndex > 0 ? subject.units[unitIndex - 1] : null;
    const nextUnit = unitIndex < subject.units.length - 1 ? subject.units[unitIndex + 1] : null;

    let navHTML = '<nav class="unit-nav">';
    if (prevUnit) {
      navHTML += `
        <a href="#/subject/${subjectId}/${prevUnit.id}" class="unit-nav-link prev">
          <span class="unit-nav-label">← Previous</span>
          <span class="unit-nav-title">${esc(prevUnit.title)}</span>
        </a>`;
    }
    if (nextUnit) {
      navHTML += `
        <a href="#/subject/${subjectId}/${nextUnit.id}" class="unit-nav-link next">
          <span class="unit-nav-label">Next →</span>
          <span class="unit-nav-title">${esc(nextUnit.title)}</span>
        </a>`;
    }
    navHTML += '</nav>';

    // Render
    contentEl.innerHTML = `
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="#/">Home</a>
        <span class="breadcrumbs-separator">›</span>
        <a href="#/subject/${subjectId}">${esc(subject.name)}</a>
        <span class="breadcrumbs-separator">›</span>
        <span class="breadcrumbs-current">${esc(unit.title)}</span>
      </nav>
      <div class="unit-subject-label">${esc(subject.name)}</div>
      <h1 class="unit-title">${esc(unit.title)}</h1>
      ${headerHTML ? `<div class="unit-description">${headerHTML}</div>` : ''}
      <div class="unit-actions">
        <button class="btn btn-expand-all" id="btn-expand-all" onclick="window.__toggleAllTopics()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="7 13 12 18 17 13"></polyline>
            <polyline points="7 6 12 11 17 6"></polyline>
          </svg>
          <span>Expand all</span>
        </button>
        <button class="btn btn-print" id="btn-print" onclick="window.__printUnit()">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 6 2 18 2 18 9"></polyline>
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
            <rect x="6" y="14" width="12" height="8"></rect>
          </svg>
          <span>Print</span>
        </button>
      </div>
      <div class="topics-container" id="topics-container">${topicsHTML}</div>
      ${navHTML}`;

    hideLoading();

    // Build outline
    buildOutline(topicTitles);

    // Reset expand state
    allExpanded = false;
  }

  // ─── Topic Splitting ──────────────────────────────────────
  function splitIntoTopics(html) {
    const container = document.createElement('div');
    container.innerHTML = html;

    let headerHTML = '';
    let topicsHTML = '';
    const topicTitles = [];
    let currentTopicTitle = '';
    let currentTopicContent = '';
    let topicIndex = 0;
    let foundFirstH2 = false;

    for (const node of Array.from(container.childNodes)) {
      const isH1 = node.nodeType === Node.ELEMENT_NODE && node.tagName === 'H1';
      const isH2 = node.nodeType === Node.ELEMENT_NODE && node.tagName === 'H2';

      if (isH1) {
        // Skip h1 — we render the title from subjects.json
        continue;
      }

      if (isH2) {
        // Save previous topic if exists
        if (foundFirstH2 && currentTopicTitle) {
          topicsHTML += buildTopicHTML(currentTopicTitle, currentTopicContent, topicIndex);
          topicTitles.push(currentTopicTitle);
        }

        foundFirstH2 = true;
        topicIndex++;
        currentTopicTitle = node.textContent;
        currentTopicContent = '';
      } else if (!foundFirstH2) {
        // Content before first h2 → unit description
        headerHTML += node.outerHTML || node.textContent;
      } else {
        // Content inside a topic
        currentTopicContent += node.outerHTML || node.textContent;
      }
    }

    // Don't forget the last topic
    if (foundFirstH2 && currentTopicTitle) {
      topicsHTML += buildTopicHTML(currentTopicTitle, currentTopicContent, topicIndex);
      topicTitles.push(currentTopicTitle);
    }

    return { headerHTML, topicsHTML, topicTitles };
  }

  function buildTopicHTML(title, content, index) {
    const openAttr = index <= 2 ? ' open' : '';
    const id = 'topic-' + index;
    return `
      <details class="topic" id="${id}"${openAttr}>
        <summary class="topic-title">${esc(title)}</summary>
        <div class="topic-content">${content}</div>
      </details>`;
  }

  // ─── Expand / Collapse All ─────────────────────────────────
  window.__toggleAllTopics = function () {
    const details = $$('.topic');
    const btn = $('#btn-expand-all');
    allExpanded = !allExpanded;

    details.forEach(d => {
      if (allExpanded) {
        d.setAttribute('open', '');
      } else {
        d.removeAttribute('open');
      }
    });

    if (btn) {
      btn.querySelector('span').textContent = allExpanded ? 'Collapse all' : 'Expand all';
      btn.querySelector('svg').style.transform = allExpanded ? 'rotate(180deg)' : '';
    }
  };

  // ─── Print ─────────────────────────────────────────────────
  let detailsStatesBeforePrint = [];

  window.__printUnit = function () {
    window.print();
  };

  function setupPrintHooks() {
    window.addEventListener('beforeprint', () => {
      const details = $$('.topic');
      detailsStatesBeforePrint = [];
      details.forEach(d => {
        detailsStatesBeforePrint.push(d.hasAttribute('open'));
        d.setAttribute('open', '');
      });
    });

    window.addEventListener('afterprint', () => {
      const details = $$('.topic');
      details.forEach((d, i) => {
        if (i < detailsStatesBeforePrint.length && !detailsStatesBeforePrint[i]) {
          d.removeAttribute('open');
        }
      });
    });
  }

  // ─── Sidebar ───────────────────────────────────────────────
  function updateSidebar(activeSubjectId, activeUnitId) {
    if (!subjectsData) return;

    let html = '';
    for (const s of subjectsData.subjects) {
      const isActive = s.id === activeSubjectId;
      const linkClass = isActive ? 'sidebar-link active' : 'sidebar-link';
      const href = `#/subject/${s.id}`;

      html += `<li class="sidebar-item">`;
      html += `<a href="${href}" class="${linkClass}">${esc(s.name)}</a>`;

      // Show units if this subject is active
      if (isActive && s.units.length > 0) {
        html += '<ul class="sidebar-subnav">';
        for (const u of s.units) {
          const unitActive = u.id === activeUnitId;
          const uClass = unitActive ? 'sidebar-link active' : 'sidebar-link';
          html += `<li><a href="#/subject/${s.id}/${u.id}" class="${uClass}">${esc(u.title)}</a></li>`;
        }
        html += '</ul>';
      }

      html += `</li>`;
    }

    sidebarNav.innerHTML = html;
  }

  function setupSidebar() {
    sidebarToggle.addEventListener('click', () => {
      const isOpen = sidebarEl.classList.contains('open');
      if (isOpen) closeSidebar();
      else openSidebar();
    });

    sidebarOverlay.addEventListener('click', closeSidebar);
  }

  function openSidebar() {
    sidebarEl.classList.add('open');
    sidebarOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebarEl.classList.remove('open');
    sidebarOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ─── Outline ───────────────────────────────────────────────
  function buildOutline(topicTitles) {
    if (!topicTitles || topicTitles.length === 0) {
      hideOutline();
      return;
    }

    let html = '';
    topicTitles.forEach((title, i) => {
      html += `<li><a href="#topic-${i + 1}" class="outline-link" data-topic="${i + 1}">${esc(title)}</a></li>`;
    });
    outlineList.innerHTML = html;

    // Show outline on wide screens (CSS handles display via media query)
    outlineEl.style.display = '';

    // Add click handlers
    outlineList.querySelectorAll('.outline-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const topicId = link.getAttribute('href').slice(1);
        const topicEl = document.getElementById(topicId);
        if (topicEl) {
          topicEl.setAttribute('open', '');
          topicEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });

    // Scroll spy
    setupScrollSpy();
  }

  function hideOutline() {
    outlineEl.style.display = 'none';
    outlineList.innerHTML = '';
  }

  function setupScrollSpy() {
    const links = outlineList.querySelectorAll('.outline-link');
    if (links.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(l => l.classList.remove('active'));
          const active = outlineList.querySelector(`[data-topic="${id.replace('topic-', '')}"]`);
          if (active) active.classList.add('active');
        }
      }
    }, {
      rootMargin: `-${parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) + 20}px 0px -60% 0px`,
      threshold: 0
    });

    $$('.topic').forEach(t => observer.observe(t));
  }

  // ─── Search ────────────────────────────────────────────────
  function setupSearch() {
    // Open
    searchTrigger.addEventListener('click', openSearch);

    // Keyboard shortcut
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape' && searchModal.classList.contains('active')) {
        closeSearch();
      }
    });

    // Close on overlay click
    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });

    // Search input
    let searchTimeout;
    searchInput.addEventListener('input', () => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        performSearch(searchInput.value);
      }, 200);
    });
  }

  function openSearch() {
    searchModal.classList.add('active');
    searchInput.focus();
    searchInput.select();
    document.body.style.overflow = 'hidden';

    // Build index on first open
    if (!searchIndex && !searchIndexBuilding) {
      buildSearchIndex();
    }
  }

  function closeSearch() {
    searchModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  async function buildSearchIndex() {
    searchIndexBuilding = true;
    searchIndex = [];

    for (const subject of subjectsData.subjects) {
      for (const unit of subject.units) {
        const url = `subjects/${subject.id}/${unit.id}.md`;
        try {
          const res = await fetch(url);
          if (!res.ok) continue;
          const md = await res.text();

          // Split by ## to get topics
          const sections = md.split(/^## /m);

          // First section (before any ##) — unit-level content
          if (sections[0].trim()) {
            searchIndex.push({
              subject: subject.name,
              subjectId: subject.id,
              unit: unit.title,
              unitId: unit.id,
              topic: unit.title,
              content: sections[0].replace(/^#\s+.+$/m, '').trim(),
              url: `#/subject/${subject.id}/${unit.id}`
            });
          }

          // Each ## section
          for (let i = 1; i < sections.length; i++) {
            const lines = sections[i].split('\n');
            const topicTitle = lines[0].trim();
            const content = lines.slice(1).join('\n').trim();

            searchIndex.push({
              subject: subject.name,
              subjectId: subject.id,
              unit: unit.title,
              unitId: unit.id,
              topic: topicTitle,
              content: content,
              url: `#/subject/${subject.id}/${unit.id}`
            });
          }
        } catch (e) {
          // skip
        }
      }
    }

    searchIndexBuilding = false;
  }

  function performSearch(query) {
    if (!query || query.trim().length < 2) {
      searchResults.innerHTML = '<div class="search-empty">Start typing to search across all notes</div>';
      return;
    }

    if (!searchIndex) {
      searchResults.innerHTML = '<div class="search-empty">Building search index…</div>';
      return;
    }

    const q = query.toLowerCase().trim();
    const results = [];

    for (const entry of searchIndex) {
      const titleMatch = entry.topic.toLowerCase().includes(q);
      const contentMatch = entry.content.toLowerCase().includes(q);

      if (titleMatch || contentMatch) {
        let snippet = '';
        if (contentMatch) {
          // Strip markdown syntax for snippet
          const plainContent = entry.content
            .replace(/[#*_`~\[\]]/g, '')
            .replace(/\|/g, ' ')
            .replace(/\n+/g, ' ')
            .trim();
          const idx = plainContent.toLowerCase().indexOf(q);
          if (idx >= 0) {
            const start = Math.max(0, idx - 50);
            const end = Math.min(plainContent.length, idx + query.length + 80);
            snippet = (start > 0 ? '…' : '') +
              plainContent.slice(start, end) +
              (end < plainContent.length ? '…' : '');
          }
        }

        results.push({
          ...entry,
          snippet,
          titleMatch,
          relevance: titleMatch ? 2 : 1
        });
      }
    }

    results.sort((a, b) => b.relevance - a.relevance);

    if (results.length === 0) {
      searchResults.innerHTML = `<div class="search-no-results">No results found for "${esc(query)}"</div>`;
      return;
    }

    // Group by subject
    const grouped = {};
    for (const r of results) {
      if (!grouped[r.subject]) grouped[r.subject] = [];
      grouped[r.subject].push(r);
    }

    let html = '';
    for (const [subject, items] of Object.entries(grouped)) {
      html += `<div class="search-result-group">`;
      html += `<div class="search-result-group-title">${esc(subject)}</div>`;
      for (const item of items.slice(0, 8)) {
        const snippetHTML = item.snippet
          ? `<div class="search-result-snippet">${highlightMatch(esc(item.snippet), query)}</div>`
          : '';
        html += `
          <a href="${item.url}" class="search-result-item" onclick="document.querySelector('.search-modal').classList.remove('active');document.body.style.overflow='';">
            <div class="search-result-title">${highlightMatch(esc(item.topic), query)}</div>
            <div class="search-result-path">${esc(item.unit)}</div>
            ${snippetHTML}
          </a>`;
      }
      html += `</div>`;
    }

    searchResults.innerHTML = html;
  }

  function highlightMatch(text, query) {
    if (!query) return text;
    const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // ─── Theme ─────────────────────────────────────────────────
  function setupTheme() {
    const saved = localStorage.getItem('btechnotes-theme');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (saved === 'light') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      // Check system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    }

    themeToggle.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('btechnotes-theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('btechnotes-theme', 'dark');
      }
    });
  }

  // ─── Loading Bar ───────────────────────────────────────────
  function showLoading() {
    loadingBar.classList.add('active');
  }

  function hideLoading() {
    loadingBar.classList.remove('active');
  }

  // ─── 404 ───────────────────────────────────────────────────
  function renderNotFound(message) {
    document.title = 'Not Found — BTech Notes';
    updateSidebar(null, null);
    hideOutline();
    contentEl.innerHTML = `
      <div style="padding:3rem 0;text-align:center;">
        <h1 style="font-size:1.5rem;margin-bottom:0.5rem;">Not Found</h1>
        <p style="color:var(--text-secondary);margin-bottom:1.5rem;">${esc(message)}</p>
        <a href="#/" class="btn">← Back to Home</a>
      </div>`;
  }

  // ─── Utilities ─────────────────────────────────────────────
  function esc(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ─── Start ─────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
