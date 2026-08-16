/* ============================================================
   BTech Notes — Main Application Script
   Editorial SPA router, HTML & Markdown processors, ScrollSpy, Search.
   ============================================================ */

(function () {
  'use strict';

  // ─── State ─────────────────────────────────────────────────
  let subjectsData = null;
  let searchIndex = null;
  let searchIndexBuilding = false;
  let scrollSpyObserver = null;

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
  const progressBar = $('#reading-progress-bar');
  const imageModal = $('#image-modal');
  const imageModalImg = $('#image-modal-img');
  const imageModalCaption = $('#image-modal-caption');
  const imageModalClose = $('#image-modal-close');
  const imageModalBackdrop = $('#image-modal-backdrop');

  // ─── Initialize ────────────────────────────────────────────
  async function init() {
    setupTheme();
    setupSidebar();
    setupHeaderAutoHide();
    setupSearch();
    setupImageModal();
    setupReadingProgressBar();
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
    const hashClean = hash.startsWith('#') ? hash.slice(1) : hash;
    const hashParts = hashClean.split('#');
    const pathPart = hashParts[0] || '/';
    const targetAnchor = hashParts[1] || null;

    const path = pathPart.startsWith('/') ? pathPart.slice(1) : pathPart;
    const parts = path.split('/').filter(Boolean);

    // Close mobile sidebar on navigation
    closeSidebar();

    if (parts.length === 0 || path === '') {
      renderHome();
    } else if (parts[0] === 'subject' && parts.length === 2) {
      renderSubject(parts[1]);
    } else if (parts[0] === 'subject' && parts.length === 3) {
      renderUnit(parts[1], parts[2], targetAnchor);
    } else {
      renderHome();
    }

    if (!targetAnchor) {
      window.scrollTo(0, 0);
    }
  }

  // ─── Render: Home (Subject Cards Grid) ─────────────────────
  function renderHome() {
    document.title = 'BTech Notes — Comprehensive University Studies';
    updateSidebar(null, null);
    hideOutline();

    const subjects = subjectsData.subjects;
    let cardsHTML = '';
    for (const s of subjects) {
      const unitCount = s.units.length;
      const unitLabel = unitCount === 1 ? '1 unit' : `${unitCount} units`;
      cardsHTML += `
        <a href="#/subject/${s.id}" class="subject-card" id="card-${s.id}">
          <div class="subject-card-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
              <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
            </svg>
          </div>
          <div class="subject-card-name">${esc(s.name)}</div>
          <div class="subject-card-meta">${unitLabel} · Full notes & cheat sheets</div>
        </a>`;
    }

    contentEl.innerHTML = `
      <div class="home-header">
        <h1>BTech Study Notes</h1>
        <p>Curated, high-yield university lecture notes, architectures, and cheat sheets.</p>
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
    subject.units.forEach((u, idx) => {
      unitsHTML += `
        <li class="unit-list-item">
          <a href="#/subject/${subject.id}/${u.id}" class="unit-list-link" id="unit-link-${u.id}">
            <div>
              <span style="font-size:0.75rem;font-weight:600;color:var(--text-tertiary);text-transform:uppercase;letter-spacing:0.04em;display:block;margin-bottom:0.15rem;">Part ${idx + 1}</span>
              <span class="unit-list-title">${esc(u.title)}</span>
            </div>
            <svg class="unit-list-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </a>
        </li>`;
    });

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

  // ─── Render: Unit (Editorial HTML or Markdown Document) ─────
  async function renderUnit(subjectId, unitId, targetAnchor) {
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
      <div class="unit-header-card">
        <div class="unit-subject-tag">${esc(subject.name)}</div>
        <h1 class="unit-title">${esc(unit.title)}</h1>
        <div style="padding:2rem 0;color:var(--text-tertiary);font-size:0.875rem;">Loading notes…</div>
      </div>`;

    let docData = null;
    let rawText = '';
    try {
      // 1. Check for .html notes first (clean semantic HTML)
      const htmlRes = await fetch(`subjects/${subjectId}/${unitId}.html`);
      if (htmlRes.ok) {
        rawText = await htmlRes.text();
        docData = processHTMLDocument(rawText);
      } else {
        // 2. Fallback to .md notes
        const mdRes = await fetch(`subjects/${subjectId}/${unitId}.md`);
        if (!mdRes.ok) throw new Error(`HTTP ${mdRes.status}`);
        rawText = await mdRes.text();
        docData = processMarkdownDocument(rawText);
      }
    } catch (e) {
      console.error('Error loading notes:', e);
      hideLoading();
      contentEl.innerHTML = `
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="#/">Home</a>
          <span class="breadcrumbs-separator">›</span>
          <a href="#/subject/${subjectId}">${esc(subject.name)}</a>
          <span class="breadcrumbs-separator">›</span>
          <span class="breadcrumbs-current">${esc(unit.title)}</span>
        </nav>
        <div class="unit-header-card">
          <div class="unit-subject-tag">${esc(subject.name)}</div>
          <h1 class="unit-title">${esc(unit.title)}</h1>
          <div style="padding:2rem 0;color:var(--text-tertiary);">
            <p>Notes file not found.</p>
            <p style="font-size:0.8125rem;margin-top:0.5rem;">Expected: <code>subjects/${esc(subjectId)}/${esc(unitId)}.html</code> or <code>.md</code></p>
          </div>
        </div>`;
      return;
    }

    const { docHTML, tocItems, leadDescription } = docData;

    // Reading time calculation (~200 wpm)
    const wordCount = rawText.replace(/<[^>]*>/g, ' ').trim().split(/\s+/).length;
    const readTimeMinutes = Math.max(1, Math.ceil(wordCount / 200));

    // Build prev/next navigation
    const prevUnit = unitIndex > 0 ? subject.units[unitIndex - 1] : null;
    const nextUnit = unitIndex < subject.units.length - 1 ? subject.units[unitIndex + 1] : null;

    let navHTML = '<nav class="unit-nav">';
    if (prevUnit) {
      navHTML += `
        <a href="#/subject/${subjectId}/${prevUnit.id}" class="unit-nav-link prev">
          <span class="unit-nav-label">← Previous Unit</span>
          <span class="unit-nav-title">${esc(prevUnit.title)}</span>
        </a>`;
    }
    if (nextUnit) {
      navHTML += `
        <a href="#/subject/${subjectId}/${nextUnit.id}" class="unit-nav-link next">
          <span class="unit-nav-label">Next Unit →</span>
          <span class="unit-nav-title">${esc(nextUnit.title)}</span>
        </a>`;
    }
    navHTML += '</nav>';

    // Render Editorial Page Layout
    contentEl.innerHTML = `
      <nav class="breadcrumbs" aria-label="Breadcrumb">
        <a href="#/">Home</a>
        <span class="breadcrumbs-separator">›</span>
        <a href="#/subject/${subjectId}">${esc(subject.name)}</a>
        <span class="breadcrumbs-separator">›</span>
        <span class="breadcrumbs-current">${esc(unit.title)}</span>
      </nav>
      <header class="unit-header-card">
        <div class="unit-subject-tag">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
          </svg>
          ${esc(subject.name)}
        </div>
        <h1 class="unit-title">${esc(unit.title)}</h1>
        ${leadDescription ? `<p class="unit-lead">${leadDescription}</p>` : ''}
        <div class="unit-meta-bar">
          <div class="unit-meta-left">
            <span class="unit-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
              ${readTimeMinutes} min read
            </span>
            <span class="unit-meta-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
              </svg>
              Unit ${unitIndex + 1} of ${subject.units.length}
            </span>
          </div>
          <div class="unit-meta-right">
            <button class="btn-action" onclick="window.__printUnit()" title="Print or save as PDF">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="6 9 6 2 18 2 18 9"></polyline>
                <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
                <rect x="6" y="14" width="12" height="8"></rect>
              </svg>
              Print Notes
            </button>
          </div>
        </div>
      </header>

      <article class="doc-body" id="doc-body">
        ${docHTML}
      </article>

      ${navHTML}`;

    hideLoading();

    // Attach copy buttons to code blocks
    setupCodeCopyButtons();

    // Build right-hand TOC & activate ScrollSpy
    buildTOC(tocItems);

    // Deep link scroll if target anchor provided
    if (targetAnchor) {
      setTimeout(() => {
        const targetEl = document.getElementById(targetAnchor);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }

  // ─── Process HTML Document ─────────────────────────────────
  function processHTMLDocument(htmlText) {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlText;

    let leadDescription = '';
    const leadEl = tempDiv.querySelector('.unit-lead');
    if (leadEl) {
      leadDescription = leadEl.innerHTML;
      leadEl.remove();
    }

    const h1El = tempDiv.querySelector('h1');
    if (h1El) {
      h1El.remove();
    }

    const tocItems = [];
    const headings = tempDiv.querySelectorAll('h2, h3');
    headings.forEach((h, idx) => {
      const titleText = h.textContent.replace(/#+$/, '').trim();
      const slug = h.id || slugify(titleText) || `section-${idx + 1}`;
      h.id = slug;

      if (!h.querySelector('.heading-anchor')) {
        const anchor = document.createElement('a');
        anchor.href = `#${slug}`;
        anchor.className = 'heading-anchor';
        anchor.setAttribute('aria-label', `Permalink to ${titleText}`);
        anchor.innerHTML = '#';
        h.appendChild(anchor);
      }

      tocItems.push({
        id: slug,
        title: titleText,
        level: h.tagName.toLowerCase()
      });
    });

    return {
      docHTML: tempDiv.innerHTML,
      tocItems,
      leadDescription
    };
  }

  // ─── Process Markdown into Flowing Editorial Document ─────
  function processMarkdownDocument(mdText) {
    const rawHTML = marked.parse(mdText);
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = rawHTML;

    let leadDescription = '';
    const tocItems = [];
    let headingCount = 0;

    const childNodes = Array.from(tempDiv.childNodes);
    let foundFirstHeading = false;

    childNodes.forEach((node) => {
      // Skip top-level H1
      if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'H1') {
        node.remove();
        return;
      }

      // Extract introductory paragraph before first h2
      if (!foundFirstHeading) {
        if (node.nodeType === Node.ELEMENT_NODE && (node.tagName === 'H2' || node.tagName === 'H3')) {
          foundFirstHeading = true;
        } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === 'P' && !leadDescription) {
          leadDescription = node.innerHTML;
          node.remove();
          return;
        }
      }

      // Process headings for TOC and permalinks
      if (node.nodeType === Node.ELEMENT_NODE && (node.tagName === 'H2' || node.tagName === 'H3')) {
        headingCount++;
        const titleText = node.textContent.trim();
        const slug = slugify(titleText) || `section-${headingCount}`;
        node.id = slug;

        const anchor = document.createElement('a');
        anchor.href = `#${slug}`;
        anchor.className = 'heading-anchor';
        anchor.setAttribute('aria-label', `Permalink to ${titleText}`);
        anchor.innerHTML = '#';
        node.appendChild(anchor);

        tocItems.push({
          id: slug,
          title: titleText,
          level: node.tagName.toLowerCase()
        });
      }
    });

    return {
      docHTML: tempDiv.innerHTML,
      tocItems,
      leadDescription
    };
  }

  function slugify(text) {
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // ─── Header Auto-Hide on Scroll ────────────────────────────
  function setupHeaderAutoHide() {
    let lastScrollY = window.scrollY;
    const headerEl = $('#header');
    if (!headerEl) return;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 70) {
        headerEl.classList.add('header-hidden');
      } else if (currentScrollY < lastScrollY || currentScrollY <= 20) {
        headerEl.classList.remove('header-hidden');
      }
      lastScrollY = currentScrollY;
    }, { passive: true });
  }

  // ─── Code Block Copy Buttons ───────────────────────────────
  function setupCodeCopyButtons() {
    const pres = $$('.doc-body pre');
    pres.forEach(pre => {
      if (pre.parentElement.classList.contains('code-block-wrapper')) return;

      const wrapper = document.createElement('div');
      wrapper.className = 'code-block-wrapper';

      const codeEl = pre.querySelector('code');
      let lang = 'CODE';
      if (codeEl) {
        const langClass = Array.from(codeEl.classList).find(c => c.startsWith('language-'));
        if (langClass) {
          lang = langClass.replace('language-', '').toUpperCase();
        }
      }

      const header = document.createElement('div');
      header.className = 'code-block-header';
      header.innerHTML = `
        <span>${esc(lang)}</span>
        <button class="code-copy-btn" aria-label="Copy code to clipboard">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
          </svg>
          <span>Copy</span>
        </button>
      `;

      const copyBtn = header.querySelector('.code-copy-btn');
      copyBtn.addEventListener('click', async () => {
        const textToCopy = codeEl ? codeEl.innerText : pre.innerText;
        try {
          await navigator.clipboard.writeText(textToCopy);
          copyBtn.classList.add('copied');
          copyBtn.querySelector('span').textContent = 'Copied!';
          setTimeout(() => {
            copyBtn.classList.remove('copied');
            copyBtn.querySelector('span').textContent = 'Copy';
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code:', err);
        }
      });

      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(header);
      wrapper.appendChild(pre);
    });
  }

  // ─── Table of Contents (TOC) & Active ScrollSpy ────────────
  function buildTOC(tocItems) {
    if (!tocItems || tocItems.length === 0) {
      hideOutline();
      return;
    }

    let html = '';
    tocItems.forEach(item => {
      const isH3 = item.level === 'h3';
      const indentStyle = isH3 ? 'padding-left:1.5rem;font-size:0.75rem;' : '';
      html += `
        <li class="outline-item">
          <a href="#${item.id}" class="outline-link" data-id="${item.id}" style="${indentStyle}">
            ${esc(item.title)}
          </a>
        </li>`;
    });
    outlineList.innerHTML = html;

    outlineEl.style.display = '';

    // Click handler for smooth scroll
    outlineList.querySelectorAll('.outline-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('data-id');
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.replaceState(null, '', `#${targetId}`);
        }
      });
    });

    setupScrollSpy();
  }

  function hideOutline() {
    outlineEl.style.display = 'none';
    outlineList.innerHTML = '';
    if (scrollSpyObserver) {
      scrollSpyObserver.disconnect();
      scrollSpyObserver = null;
    }
  }

  function setupScrollSpy() {
    if (scrollSpyObserver) scrollSpyObserver.disconnect();

    const headings = Array.from($$('.doc-body h2, .doc-body h3'));
    if (headings.length === 0) return;

    const links = Array.from(outlineList.querySelectorAll('.outline-link'));

    scrollSpyObserver = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          links.forEach(l => l.classList.remove('active'));
          const activeLink = outlineList.querySelector(`[data-id="${id}"]`);
          if (activeLink) {
            activeLink.classList.add('active');
          }
        }
      }
    }, {
      rootMargin: '-80px 0px -70% 0px',
      threshold: 0
    });

    headings.forEach(h => scrollSpyObserver.observe(h));
  }

  // ─── Reading Progress Bar ──────────────────────────────────
  function setupReadingProgressBar() {
    window.addEventListener('scroll', () => {
      if (!progressBar) return;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100));
        progressBar.style.width = `${progress}%`;
      } else {
        progressBar.style.width = '0%';
      }
    }, { passive: true });
  }

  // ─── Sidebar Navigation Tree ───────────────────────────────
  function updateSidebar(activeSubjectId, activeUnitId) {
    if (!subjectsData || !subjectsData.subjects) return;

    let html = '';
    for (const s of subjectsData.subjects) {
      const isSubActive = s.id === activeSubjectId;
      const subHeaderClass = isSubActive ? 'sidebar-subject-header active' : 'sidebar-subject-header';

      html += `<li class="sidebar-item">`;
      html += `
        <a href="#/subject/${s.id}" class="${subHeaderClass}">
          <span>${esc(s.name)}</span>
          <span class="sidebar-count-chip">${s.units.length}</span>
        </a>`;

      if (s.units && s.units.length > 0) {
        html += '<ul class="sidebar-subnav">';
        for (const u of s.units) {
          const isUnitActive = isSubActive && u.id === activeUnitId;
          const uClass = isUnitActive ? 'sidebar-link active' : 'sidebar-link';
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
      if (window.innerWidth <= 768) {
        const isOpen = sidebarEl.classList.contains('open');
        if (isOpen) closeSidebar();
        else openSidebar();
      } else {
        const layoutEl = $('.layout');
        if (layoutEl) {
          layoutEl.classList.toggle('sidebar-collapsed');
        }
      }
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

  // ─── Search & Command Palette (⌘K) ─────────────────────────
  function setupSearch() {
    searchTrigger.addEventListener('click', openSearch);

    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        openSearch();
      }
      if (e.key === 'Escape' && searchModal.classList.contains('active')) {
        closeSearch();
      }
    });

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });

    let debounceTimer;
    searchInput.addEventListener('input', () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        performSearch(searchInput.value.trim());
      }, 120);
    });

    // Keyboard navigation in search results
    searchInput.addEventListener('keydown', (e) => {
      const items = $$('.search-result-item');
      const selected = $('.search-result-item.selected');
      let index = Array.from(items).indexOf(selected);

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (items.length === 0) return;
        if (selected) selected.classList.remove('selected');
        index = (index + 1) % items.length;
        items[index].classList.add('selected');
        items[index].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (items.length === 0) return;
        if (selected) selected.classList.remove('selected');
        index = (index - 1 + items.length) % items.length;
        items[index].classList.add('selected');
        items[index].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (selected) {
          selected.click();
        } else if (items.length > 0) {
          items[0].click();
        }
      }
    });
  }

  function openSearch() {
    searchModal.classList.add('active');
    searchInput.value = '';
    searchResults.innerHTML = '<div class="search-empty">Type keywords to search across all notes…</div>';
    document.body.style.overflow = 'hidden';
    setTimeout(() => searchInput.focus(), 50);

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

    if (!subjectsData || !subjectsData.subjects) return;

    for (const subject of subjectsData.subjects) {
      for (const unit of subject.units) {
        try {
          let isHtml = false;
          let contentText = '';
          const htmlRes = await fetch(`subjects/${subject.id}/${unit.id}.html`);
          if (htmlRes.ok) {
            contentText = await htmlRes.text();
            isHtml = true;
          } else {
            const mdRes = await fetch(`subjects/${subject.id}/${unit.id}.md`);
            if (mdRes.ok) {
              contentText = await mdRes.text();
            } else {
              continue;
            }
          }

          if (isHtml) {
            const temp = document.createElement('div');
            temp.innerHTML = contentText;
            const headings = temp.querySelectorAll('h2, h3');
            if (headings.length > 0) {
              headings.forEach(h => {
                const hTitle = h.textContent.replace(/#+$/, '').trim();
                const hId = h.id || slugify(hTitle);
                let next = h.nextElementSibling;
                let secText = '';
                while (next && !['H2', 'H3'].includes(next.tagName)) {
                  secText += ' ' + next.textContent;
                  next = next.nextElementSibling;
                }
                searchIndex.push({
                  subjectId: subject.id,
                  subjectName: subject.name,
                  unitId: unit.id,
                  unitTitle: unit.title,
                  section: hTitle,
                  sectionId: hId,
                  content: secText.trim()
                });
              });
            } else {
              searchIndex.push({
                subjectId: subject.id,
                subjectName: subject.name,
                unitId: unit.id,
                unitTitle: unit.title,
                section: unit.title,
                sectionId: slugify(unit.title),
                content: temp.textContent.trim()
              });
            }
          } else {
            // Markdown parsing
            const lines = contentText.split('\n');
            let currentSection = unit.title;
            let currentSectionId = slugify(unit.title);
            let currentContent = '';

            for (const line of lines) {
              if (line.startsWith('## ') || line.startsWith('### ')) {
                if (currentContent.trim()) {
                  searchIndex.push({
                    subjectId: subject.id,
                    subjectName: subject.name,
                    unitId: unit.id,
                    unitTitle: unit.title,
                    section: currentSection,
                    sectionId: currentSectionId,
                    content: currentContent.trim()
                  });
                }
                const rawTitle = line.replace(/^#+\s*/, '').trim();
                currentSection = rawTitle;
                currentSectionId = slugify(rawTitle);
                currentContent = '';
              } else {
                currentContent += ' ' + line;
              }
            }

            if (currentContent.trim()) {
              searchIndex.push({
                subjectId: subject.id,
                subjectName: subject.name,
                unitId: unit.id,
                unitTitle: unit.title,
                section: currentSection,
                sectionId: currentSectionId,
                content: currentContent.trim()
              });
            }
          }
        } catch (e) {
          // ignore indexing errors for single file
        }
      }
    }

    searchIndexBuilding = false;
  }

  function performSearch(query) {
    if (!query) {
      searchResults.innerHTML = '<div class="search-empty">Type keywords to search across all notes…</div>';
      return;
    }

    if (!searchIndex) {
      searchResults.innerHTML = '<div class="search-empty">Building search index…</div>';
      return;
    }

    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    const matches = [];

    for (const entry of searchIndex) {
      const fullText = (entry.unitTitle + ' ' + entry.section + ' ' + entry.content).toLowerCase();
      let score = 0;
      let allFound = true;

      for (const term of terms) {
        if (entry.section.toLowerCase().includes(term)) score += 10;
        else if (entry.unitTitle.toLowerCase().includes(term)) score += 5;
        else if (entry.content.toLowerCase().includes(term)) score += 1;
        else {
          allFound = false;
          break;
        }
      }

      if (allFound && score > 0) {
        matches.push({ entry, score });
      }
    }

    matches.sort((a, b) => b.score - a.score);
    const topMatches = matches.slice(0, 15);

    if (topMatches.length === 0) {
      searchResults.innerHTML = '<div class="search-no-results">No matching notes found. Try another query.</div>';
      return;
    }

    let html = '';
    topMatches.forEach((m, idx) => {
      const e = m.entry;
      const snippet = extractSnippet(e.content, terms);
      const selectedClass = idx === 0 ? ' selected' : '';
      const targetUrl = `#/subject/${e.subjectId}/${e.unitId}#${e.sectionId}`;
      html += `
        <a href="${targetUrl}" class="search-result-item${selectedClass}" data-section="${e.sectionId}" onclick="window.__navigateToSearchResult(event, '${e.subjectId}', '${e.unitId}', '${e.sectionId}')">
          <div class="search-result-title">${highlightTerms(esc(e.section), terms)}</div>
          <div class="search-result-path">${esc(e.subjectName)} › ${esc(e.unitTitle)}</div>
          <div class="search-result-snippet">${highlightTerms(snippet, terms)}</div>
        </a>`;
    });

    searchResults.innerHTML = html;
  }

  window.__navigateToSearchResult = function (event, subjectId, unitId, sectionId) {
    if (event) event.preventDefault();
    closeSearch();
    const currentHash = location.hash || '';
    const targetBase = `#/subject/${subjectId}/${unitId}`;

    if (currentHash.startsWith(targetBase)) {
      // Already on this unit page, smoothly scroll directly to section element
      const targetEl = document.getElementById(sectionId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', `${targetBase}#${sectionId}`);
      }
    } else {
      // Route to target unit with section anchor
      location.hash = `${targetBase}#${sectionId}`;
    }
  };

  window.__closeSearch = closeSearch;

  function extractSnippet(content, terms) {
    const plain = content.replace(/[#*`_\[\]()|>-]/g, ' ').replace(/\s+/g, ' ');
    const lower = plain.toLowerCase();

    let firstIndex = -1;
    for (const t of terms) {
      const idx = lower.indexOf(t);
      if (idx !== -1 && (firstIndex === -1 || idx < firstIndex)) {
        firstIndex = idx;
      }
    }

    if (firstIndex === -1) {
      return esc(plain.slice(0, 120)) + '…';
    }

    const start = Math.max(0, firstIndex - 40);
    const end = Math.min(plain.length, firstIndex + 100);
    return (start > 0 ? '…' : '') + esc(plain.slice(start, end)) + (end < plain.length ? '…' : '');
  }

  function highlightTerms(text, terms) {
    let result = text;
    for (const t of terms) {
      if (!t) continue;
      const re = new RegExp(`(${escapeRegex(t)})`, 'gi');
      result = result.replace(re, '<mark>$1</mark>');
    }
    return result;
  }

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  // ─── Theme Management ──────────────────────────────────────
  function setupTheme() {
    const saved = localStorage.getItem('btechnotes-theme');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (saved === 'light') {
      document.documentElement.removeAttribute('data-theme');
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
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

  // ─── Image Modal / Lightbox ────────────────────────────────
  function setupImageModal() {
    document.addEventListener('click', (e) => {
      const img = e.target.closest('.doc-body img');
      if (img) {
        openImageModal(img.src, img.alt || '');
      }
    });

    if (imageModalClose) {
      imageModalClose.addEventListener('click', closeImageModal);
    }

    if (imageModalBackdrop) {
      imageModalBackdrop.addEventListener('click', closeImageModal);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && imageModal && imageModal.classList.contains('active')) {
        closeImageModal();
      }
    });
  }

  function openImageModal(src, caption) {
    if (!imageModal || !imageModalImg) return;
    imageModalImg.src = src;
    imageModalImg.alt = caption;
    if (imageModalCaption) {
      imageModalCaption.textContent = caption;
      imageModalCaption.style.display = caption ? 'block' : 'none';
    }
    imageModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeImageModal() {
    if (!imageModal) return;
    imageModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ─── Print Support ─────────────────────────────────────────
  window.__printUnit = function () {
    window.print();
  };

  function setupPrintHooks() {
    // Standard print hook
  }

  // ─── Loading Bar ───────────────────────────────────────────
  function showLoading() {
    loadingBar.classList.add('active');
  }

  function hideLoading() {
    loadingBar.classList.remove('active');
  }

  // ─── 404 View ──────────────────────────────────────────────
  function renderNotFound(message) {
    document.title = 'Not Found — BTech Notes';
    updateSidebar(null, null);
    hideOutline();
    contentEl.innerHTML = `
      <div style="padding:4rem 0;text-align:center;">
        <h1 style="font-size:1.5rem;margin-bottom:0.5rem;font-weight:700;">Page Not Found</h1>
        <p style="color:var(--text-secondary);margin-bottom:1.5rem;">${esc(message)}</p>
        <a href="#/" class="btn-action" style="display:inline-flex;">← Back to Home</a>
      </div>`;
  }

  // ─── Utilities ─────────────────────────────────────────────
  function esc(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ─── Start Application ─────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
