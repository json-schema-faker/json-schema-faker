const closeDialogIcon = document.getElementById("x-close-dialog");
const dialogModal = document.getElementById("dialog-modal");

let isOpen;
function toggleDocsDialog() {
  dialogModal.classList.toggle("hidden");
  document.body.classList.toggle("modal-active");
  isOpen = document.body.classList.contains("modal-active");

  if (!isOpen) {
    history.replaceState(null, document.title, '/');
    document.getElementById('playground').classList.remove('section-active');
  }
}

function openDocsDialog() {
  if (isOpen) return;
  toggleDocsDialog();
}

function closeDialog(e) {
  if (e.target === dialogModal) toggleDocsDialog();
}

closeDialogIcon.addEventListener("click", toggleDocsDialog);
dialogModal.addEventListener("click", closeDialog);

// Clear .section-active when navigating to a non-playground section
dialogModal.addEventListener("click", (e) => {
  const a = e.target.closest('a[href]');
  if (a && a.getAttribute('href') !== '#playground') {
    document.getElementById('playground').classList.remove('section-active');
  }
});

const hash = window.location.hash.slice(1);
if (hash === 'docs' || hash === 'examples' || hash === 'playground' ||
    hash.startsWith('docs-') || hash.startsWith('ex-')) {
  openDocsDialog();
}
// #gist/<id> — handled in initTabs() below after editors init

document.onkeydown = function (evt) {
  evt = evt || window.event;
  var isEscape = false;
  if ("key" in evt) {
    isEscape = evt.key === "Escape" || evt.key === "Esc";
  } else {
    isEscape = evt.keyCode === 27;
  }
  if (isEscape && isOpen) {
    toggleDocsDialog();
  }
};

if (window.faker) {
  JSONSchemaFaker.extend('faker', () => window.faker);
}

// Inject dynamic version into badge
{
  const ver = window.JSONSchemaFaker?.version ?? '0.6.0';
  const badge = document.querySelector('.badge');
  if (badge) badge.textContent = `v${ver}`;
}

// ─── Editors ────────────────────────────────────────────────────────────────

const inputEditor = ace.edit('inputEditor');
inputEditor.setTheme('ace/theme/nord_dark');
inputEditor.session.setMode('ace/mode/javascript');
inputEditor.setOptions({
  fontSize: '13px',
  showPrintMargin: false,
  tabSize: 2,
  useSoftTabs: true
});

const outputEditor = ace.edit('outputEditor');
outputEditor.setTheme('ace/theme/nord_dark');
outputEditor.session.setMode('ace/mode/json');
outputEditor.setOptions({
  fontSize: '13px',
  showPrintMargin: false,
  tabSize: 2,
  useSoftTabs: true,
  readOnly: true
});

// ─── Format toggle (JSON / YAML) ─────────────────────────────────────────────

let inputFormat = 'json'; // 'json' | 'yaml'

function stripComments(str) {
  // Remove block and line comments for JSONC support
  return str
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/(?:^\s*|\s+)\/\/[^\n\r]*/g, '');
}

function parseInput(text, isYaml) {
  if (isYaml) {
    return jsyaml.load(text);
  }
  // JSON format always supports comments (JSONC behavior)
  return JSON.parse(stripComments(text));
}

// Apply format state (buttons + ACE mode) without converting editor content
function applyFormat(fmt) {
  inputFormat = fmt;
  document.getElementById('btnFormatJSON').classList.toggle('active', fmt === 'json');
  document.getElementById('btnFormatYAML').classList.toggle('active', fmt === 'yaml');
  // Use JavaScript mode for JSON (handles comments in syntax highlighting)
  const aceMode = fmt === 'json' ? 'javascript' : fmt;
  inputEditor.session.setMode(`ace/mode/${aceMode}`);
}

function setInputFormat(fmt) {
  if (fmt === inputFormat) return;
  const prev = inputFormat;
  applyFormat(fmt);

  // Convert editor content
  const text = inputEditor.getValue();
  try {
    // Parse from previous format
    let obj;
    if (prev === 'yaml') {
      obj = jsyaml.load(text);
    } else {
      // json - strip comments before parsing
      obj = JSON.parse(stripComments(text));
    }

    // Convert to new format
    if (fmt === 'yaml') {
      inputEditor.setValue(jsyaml.dump(obj, { indent: 2 }), -1);
    } else {
      inputEditor.setValue(JSON.stringify(obj, null, 2), -1);
    }
  } catch { /* leave content as-is if parse fails */ }

  // Rename active tab extension to match new format
  const activeTab = getActiveTab();
  if (activeTab) {
    if (fmt === 'yaml' && activeTab.name.endsWith('.json')) {
      activeTab.name = activeTab.name.replace(/\.json$/, '.yaml');
    } else if (fmt === 'json' && activeTab.name.endsWith('.yaml')) {
      activeTab.name = activeTab.name.replace(/\.yaml$/, '.json');
    }
    renderTabs();
  }

  // Sync active tab content
  saveActiveTab();
}

document.getElementById('btnFormatJSON').addEventListener('click', () => setInputFormat('json'));
document.getElementById('btnFormatYAML').addEventListener('click', () => setInputFormat('yaml'));

// ─── Tab state ───────────────────────────────────────────────────────────────

let tabIdCounter = 0;

function makeTab(name, content, id) {
  const tab = { id: id ?? ++tabIdCounter, name, content };
  if (id && id >= tabIdCounter) tabIdCounter = id; // keep counter in sync when restoring
  return tab;
}

// tabs initialized after sampleSchemas is defined (see Init section)
let tabs = [];
let activeTabId = null;

function persistTabs() {
  try {
    localStorage.setItem('jsf_tabs', JSON.stringify(tabs.map(t => ({ id: t.id, name: t.name, content: t.content }))));
    localStorage.setItem('jsf_activeTab', String(activeTabId));
  } catch {}
}

function getActiveTab() {
  return tabs.find(t => t.id === activeTabId);
}

function saveActiveTab() {
  const tab = getActiveTab();
  if (tab) tab.content = inputEditor.getValue();
  persistTabs();
}

function loadTab(id) {
  saveActiveTab();
  activeTabId = id;
  const tab = getActiveTab();
  if (tab) {
    inputEditor.setValue(tab.content, -1);
    inputEditor.focus();
  }
  renderTabs();
}

function addTab() {
  saveActiveTab();
  const name = `schema${tabs.length + 1}.json`;
  const content = JSON.stringify({ "$id": name, "type": "object", "properties": {} }, null, 2);
  const tab = makeTab(name, content);
  tabs.push(tab);
  activeTabId = tab.id;
  inputEditor.setValue(tab.content, -1);
  inputEditor.focus();
  renderTabs();
  // Focus the name of the new tab for immediate renaming
  const nameEl = document.querySelector(`.tab[data-id="${tab.id}"] .tab-name`);
  if (nameEl) {
    nameEl.focus();
    document.execCommand('selectAll', false, null);
  }
}

function deleteTab(id) {
  if (tabs.length === 1) return;
  const idx = tabs.findIndex(t => t.id === id);
  tabs = tabs.filter(t => t.id !== id);
  if (activeTabId === id) {
    const next = tabs[Math.min(idx, tabs.length - 1)];
    activeTabId = next.id;
    inputEditor.setValue(next.content, -1);
  }
  renderTabs();
}

function renameTab(id, newName) {
  const tab = tabs.find(t => t.id === id);
  if (tab && newName.trim()) { tab.name = newName.trim(); persistTabs(); }
}

function renderTabs() {
  const strip = document.getElementById('tabStrip');
  const addBtn = document.getElementById('tabAdd');

  // Remove existing tab elements (keep the + button)
  strip.querySelectorAll('.tab').forEach(el => el.remove());

  tabs.forEach(tab => {
    const el = document.createElement('div');
    el.className = 'tab' + (tab.id === activeTabId ? ' active' : '');
    el.dataset.id = tab.id;

    const nameEl = document.createElement('span');
    nameEl.className = 'tab-name';
    nameEl.textContent = tab.name;
    nameEl.contentEditable = 'false';
    nameEl.title = 'Double-click to rename';

    nameEl.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      nameEl.contentEditable = 'true';
      nameEl.focus();
      const range = document.createRange();
      range.selectNodeContents(nameEl);
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
    });

    nameEl.addEventListener('blur', () => {
      nameEl.contentEditable = 'false';
      renameTab(tab.id, nameEl.textContent);
      nameEl.textContent = tabs.find(t => t.id === tab.id)?.name ?? nameEl.textContent;
    });

    nameEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); nameEl.blur(); }
      if (e.key === 'Escape') {
        nameEl.textContent = tabs.find(t => t.id === tab.id)?.name ?? nameEl.textContent;
        nameEl.contentEditable = 'false';
        nameEl.blur();
      }
    });

    const closeBtn = document.createElement('button');
    closeBtn.className = 'tab-close';
    closeBtn.textContent = '×';
    closeBtn.title = 'Remove tab';
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteTab(tab.id);
    });

    el.append(nameEl, closeBtn);

    el.addEventListener('click', () => {
      if (tab.id !== activeTabId) loadTab(tab.id);
    });

    strip.insertBefore(el, addBtn);
  });
}

document.getElementById('tabAdd').addEventListener('click', addTab);

// ─── Sample schema ────────────────────────────────────────────────────────────

const sampleSchemas = [
  {
    name: 'address.json',
    schema: {
      "$id": "address.json",
      "$schema": "http://json-schema.org/draft-07/schema#",
      "type": "object",
      "properties": {
        "street":  { "type": "string" },
        "city":    { "type": "string" },
        "country": { "type": "string" },
        "zipCode": { "type": "string", "pattern": "^\\d{5}$" }
      },
      "required": ["city", "country"]
    }
  },
  {
    name: 'user.json',
    schema: {
      "$id": "user.json",
      "$schema": "http://json-schema.org/draft-07/schema#",
      "type": "object",
      "properties": {
        "id":        { "type": "integer", "minimum": 1, "maximum": 1000 },
        "name":      { "type": "string", "minLength": 5, "maxLength": 50 },
        "email":     { "type": "string", "format": "email" },
        "role":      { "type": "string", "enum": ["admin", "user", "guest"] },
        "createdAt": { "type": "string", "format": "date-time" },
        "address":   { "$ref": "address.json" }
      },
      "required": ["id", "name", "email", "role"]
    }
  }
];

// ─── Status ──────────────────────────────────────────────────────────────────

const STATUS_ICONS = {
  success: `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:#3fb950"><polyline points="20 6 9 17 4 12"/></svg>`,
  error:   `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" style="color:#f85149"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  info:    `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
};

function setStatus(text, type = 'info') {
  const statusEl = document.getElementById('statusText');
  const iconEl = document.getElementById('statusIcon');
  statusEl.textContent = text;
  statusEl.className = type;
  iconEl.innerHTML = STATUS_ICONS[type] ?? '';
}

// ─── Options ─────────────────────────────────────────────────────────────────

function getOptions() {
  const options = {};

  // Randomness
  const seed = document.getElementById('optSeed').value;
  if (seed) options.seed = parseInt(seed);
  if (document.getElementById('optFixedProbabilities').checked) options.fixedProbabilities = true;

  // Depth
  const maxDepth = document.getElementById('optMaxDepth').value;
  if (maxDepth) options.maxDepth = parseInt(maxDepth);
  const refDepthMin = document.getElementById('optRefDepthMin').value;
  if (refDepthMin) options.refDepthMin = parseInt(refDepthMin);
  const refDepthMax = document.getElementById('optRefDepthMax').value;
  if (refDepthMax) options.refDepthMax = parseInt(refDepthMax);

  // Arrays
  const minItems = document.getElementById('optMinItems').value;
  if (minItems) options.minItems = parseInt(minItems);
  const maxItems = document.getElementById('optMaxItems').value;
  if (maxItems) options.maxItems = parseInt(maxItems);
  const maxDefaultItems = document.getElementById('optMaxDefaultItems').value;
  if (maxDefaultItems) options.maxDefaultItems = parseInt(maxDefaultItems);

  // Strings
  const minLength = document.getElementById('optMinLength').value;
  if (minLength) options.minLength = parseInt(minLength);
  const maxLength = document.getElementById('optMaxLength').value;
  if (maxLength) options.maxLength = parseInt(maxLength);

  // Properties
  const optionalsProb = document.getElementById('optOptionalsProb').value;
  if (optionalsProb) options.optionalsProbability = parseFloat(optionalsProb);
  if (document.getElementById('optAlwaysFakeOptionals').checked) options.alwaysFakeOptionals = true;
  if (document.getElementById('optFillProperties').checked) options.fillProperties = true;

  // Values
  if (document.getElementById('optUseExamples').checked) options.useExamplesValue = true;
  if (document.getElementById('optUseDefaultValue').checked) options.useDefaultValue = true;

  // Date/Time
  const minDateTime = document.getElementById('optMinDateTime').value.trim();
  if (minDateTime) options.minDateTime = minDateTime;
  const maxDateTime = document.getElementById('optMaxDateTime').value.trim();
  if (maxDateTime) options.maxDateTime = maxDateTime;

  // Advanced
  const pruneProperties = document.getElementById('optPruneProperties').value.trim();
  if (pruneProperties) options.pruneProperties = pruneProperties.split(',').map(s => s.trim()).filter(Boolean);
  if (document.getElementById('optResolveJsonPath').checked) options.resolveJsonPath = true;
  if (document.getElementById('optFailOnInvalidTypes').checked) options.failOnInvalidTypes = true;
  if (document.getElementById('optValidateSchemaVersion').checked) options.validateSchemaVersion = true;
  const propAliases = document.getElementById('optPropAliases').value.trim();
  if (propAliases) { try { options.propAliases = JSON.parse(propAliases); } catch {} }

  return options;
}

// ─── Ref rewriter ─────────────────────────────────────────────────────────────

// Sanitize a schema id/name into a valid JSON Pointer token (no '/' or '~')
function defKey(id) {
  return id.replace(/~/g, '~0').replace(/\//g, '~1');
}

// Rewrites $ref values that point to external schema IDs to #/$defs/<key>
// so they resolve correctly when schemas are inlined into root $defs.
function rewriteRefs(schema, externalSchemas) {
  if (typeof schema !== 'object' || schema === null) return schema;
  if (Array.isArray(schema)) return schema.map(item => rewriteRefs(item, externalSchemas));

  const result = {};
  for (const [key, value] of Object.entries(schema)) {
    if (key === '$ref' && typeof value === 'string') {
      const base = value.split('#')[0];
      const fragment = value.includes('#') ? value.slice(value.indexOf('#') + 1) : '';
      if (base && externalSchemas.has(base)) {
        const k = defKey(base);
        result[key] = fragment ? `#/$defs/${k}${fragment}` : `#/$defs/${k}`;
      } else {
        result[key] = value;
      }
    } else {
      result[key] = rewriteRefs(value, externalSchemas);
    }
  }
  return result;
}

// ─── Generate ─────────────────────────────────────────────────────────────────

async function generateOutput() {
  saveActiveTab();
  const startTime = performance.now();
  setStatus('Generating...', 'info');
  await new Promise(r => setTimeout(r, 150));

  try {
    applyFormat(tabs[0].name.includes('.json') ? 'json' : 'yaml');

    // Parse all tabs as schemas (always honor format)
    const parsedSchemas = [];
    for (const tab of tabs) {
      try {
        const isActive = tab.id === activeTabId;
        const schema = isActive
          ? parseInput(tab.content, inputFormat === 'yaml')
          : parseInput(stripComments(tab.content), tab.name.includes('.yaml'));
        parsedSchemas.push({ tab, schema });
      } catch (e) {
        throw new Error(`Parse error in "${tab.name}": ${e.message}`);
      }
    }

    // Root schema = active tab
    const activeEntry = parsedSchemas.find(e => e.tab.id === activeTabId);
    const rootSchema = activeEntry.schema;

    // Build external schema map (id/name → schema), excluding root
    const externalSchemas = new Map();
    for (const { tab, schema } of parsedSchemas) {
      if (schema === rootSchema) continue;
      const id = (typeof schema === 'object' && schema.$id) ? schema.$id : tab.name;
      externalSchemas.set(id, schema);
    }

    // If multiple schemas, inline externals into root $defs and rewrite $refs
    let resolveSchema = rootSchema;
    if (externalSchemas.size > 0) {
      const defs = { ...(rootSchema.$defs ?? {}) };
      for (const [id, schema] of externalSchemas) {
        const { $id: _id, $schema: _s, ...rest } = (typeof schema === 'object' ? schema : {});
        defs[defKey(id)] = rest;
      }
      // Deep-clone root and rewrite external $refs to #/$defs/<id>
      resolveSchema = rewriteRefs(JSON.parse(JSON.stringify(rootSchema)), externalSchemas);
      resolveSchema.$defs = defs;
    }

    const options = getOptions();
    JSONSchemaFaker.option(options);
    const result = await JSONSchemaFaker.resolve(resolveSchema);

    outputEditor.setValue(JSON.stringify(result, null, 2), -1);

    const elapsed = (performance.now() - startTime).toFixed(2);
    setStatus('Success', 'success');
    document.getElementById('statusInfo').textContent = `${elapsed}ms`;
  } catch (error) {
    outputEditor.setValue(error.message || String(error), -1);
    setStatus('Error', 'error');
    document.getElementById('statusInfo').textContent = '';
  }
}

document.getElementById('generateBtn').addEventListener('click', generateOutput);

document.getElementById('loadSample').addEventListener('click', () => {
  // Load sample as multiple tabs
  tabs = sampleSchemas.map(s => makeTab(s.name, JSON.stringify(s.schema, null, 2)));
  activeTabId = tabs[tabs.length - 1].id; // activate root (user.json)
  inputEditor.setValue(getActiveTab().content, -1);
  renderTabs();
  generateOutput();
});

document.getElementById('toggleOptions').addEventListener('click', () => {
  document.getElementById('optionsPanel').classList.toggle('open');
});

document.addEventListener('keydown', (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
    e.preventDefault();
    generateOutput();
  }
});

// ─── Gist integration ────────────────────────────────────────────────────────

const GIST_API = 'https://api.github.com';
const JSF_GIST_DESC = 'JSON Schema Faker';

function gistHeaders(token) {
  return {
    'Authorization': `token ${token}`,
    'Accept': 'application/vnd.github+json',
    'Content-Type': 'application/json',
  };
}

async function fetchGitHubUser(token) {
  const res = await fetch(`${GIST_API}/user`, { headers: gistHeaders(token) });
  if (!res.ok) throw new Error('Invalid token');
  return res.json();
}

async function listGists(token) {
  const res = await fetch(`${GIST_API}/gists?per_page=100`, { headers: gistHeaders(token) });
  if (!res.ok) throw new Error('Failed to list gists');
  const all = await res.json();
  return all.filter(g => g.description === JSF_GIST_DESC);
}

async function loadGistById(id, token) {
  const headers = token ? gistHeaders(token) : { 'Accept': 'application/vnd.github+json' };
  const res = await fetch(`${GIST_API}/gists/${id}`, { headers });
  if (!res.ok) throw new Error(`Gist not found: ${id}`);
  return res.json();
}

async function createGist(token, files) {
  const res = await fetch(`${GIST_API}/gists`, {
    method: 'POST',
    headers: gistHeaders(token),
    body: JSON.stringify({ description: JSF_GIST_DESC, public: false, files }),
  });
  if (!res.ok) throw new Error('Failed to create gist');
  return res.json();
}

async function updateGist(token, id, files) {
  // Fetch current gist to find files that no longer exist in tabs — set them to null to delete
  const existing = await loadGistById(id, token);
  const merged = { ...files };
  for (const name of Object.keys(existing.files)) {
    if (!(name in merged)) merged[name] = null;
  }
  const res = await fetch(`${GIST_API}/gists/${id}`, {
    method: 'PATCH',
    headers: gistHeaders(token),
    body: JSON.stringify({ description: JSF_GIST_DESC, files: merged }),
  });
  if (!res.ok) throw new Error('Failed to update gist');
  return res.json();
}

async function deleteGistById(token, id) {
  const res = await fetch(`${GIST_API}/gists/${id}`, {
    method: 'DELETE',
    headers: gistHeaders(token),
  });
  if (!res.ok) throw new Error('Failed to delete gist');
}

// ─── Gist state ──────────────────────────────────────────────────────────────

let currentGistId = localStorage.getItem('jsf_gist_id') ?? null;

function getToken() {
  return localStorage.getItem('jsf_token') ?? '';
}

function tabsToGistFiles() {
  saveActiveTab();
  const files = {};
  tabs.forEach(t => { files[t.name] = { content: t.content }; });
  return files;
}

function applyGistToTabs(gist) {
  const files = Object.values(gist.files);
  if (!files.length) return;
  tabs = files.map(f => makeTab(f.filename, f.content ?? ''));
  activeTabId = tabs[0].id;
  // Detect format from the first tab's filename
  const fmt = tabs[0].name.endsWith('.yaml') || tabs[0].name.endsWith('.yml') ? 'yaml' : 'json';
  applyFormat(fmt);
  inputEditor.setValue(tabs[0].content, -1);
  persistTabs();
  renderTabs();
  generateOutput();
}

function setCurrentGist(id) {
  currentGistId = id;
  if (id) {
    localStorage.setItem('jsf_gist_id', id);
    history.replaceState(null, document.title, `#gist/${id}`);
  } else {
    localStorage.removeItem('jsf_gist_id');
    history.replaceState(null, document.title, '/');
  }
  updateGistButtons();
}

function updateGistButtons() {
  const shareBtn = document.getElementById('gistShareBtn');
  const deleteBtn = document.getElementById('gistDeleteBtn');
  if (currentGistId) {
    shareBtn.classList.remove('hidden');
    deleteBtn.classList.remove('hidden');
  } else {
    shareBtn.classList.add('hidden');
    deleteBtn.classList.add('hidden');
  }
}

// ─── Token UI ────────────────────────────────────────────────────────────────

async function applyToken(token) {
  const toolbar = document.getElementById('gistToolbar');
  const userInfo = document.getElementById('gistUserInfo');
  if (!token) {
    toolbar.classList.add('hidden');
    userInfo.textContent = '';
    return;
  }
  try {
    const user = await fetchGitHubUser(token);
    userInfo.textContent = `@${user.login}`;
    toolbar.classList.remove('hidden');
  } catch {
    userInfo.textContent = 'Invalid token';
    toolbar.classList.add('hidden');
  }
}

document.getElementById('gistTokenSave').addEventListener('click', async () => {
  const input = document.getElementById('gistTokenInput');
  const token = input.value.trim();
  if (!token) return;
  localStorage.setItem('jsf_token', token);
  input.value = '';
  await applyToken(token);
});

document.getElementById('gistTokenClear').addEventListener('click', () => {
  localStorage.removeItem('jsf_token');
  document.getElementById('gistTokenInput').value = '';
  document.getElementById('gistUserInfo').textContent = '';
  document.getElementById('gistToolbar').classList.add('hidden');
  setCurrentGist(null);
});

// ─── Save Gist ────────────────────────────────────────────────────────────────

document.getElementById('gistSaveBtn').addEventListener('click', async () => {
  const token = getToken();
  if (!token) return;
  const btn = document.getElementById('gistSaveBtn');
  btn.textContent = 'Saving…';
  btn.disabled = true;
  try {
    const files = tabsToGistFiles();
    let gist;
    if (currentGistId) {
      gist = await updateGist(token, currentGistId, files);
    } else {
      gist = await createGist(token, files);
    }
    setCurrentGist(gist.id);
    setStatus(`Gist saved: ${gist.id}`, 'success');
  } catch (e) {
    setStatus(e.message, 'error');
  } finally {
    btn.textContent = '💾 Save';
    btn.disabled = false;
  }
});

// ─── Share Gist ───────────────────────────────────────────────────────────────

document.getElementById('gistShareBtn').addEventListener('click', () => {
  if (!currentGistId) return;
  const url = `${location.origin}${location.pathname}#gist/${currentGistId}`;
  navigator.clipboard?.writeText(url).then(() => setStatus('URL copied!', 'success'))
    .catch(() => setStatus(url, 'info'));
});

// ─── Load Gist panel ─────────────────────────────────────────────────────────

async function populateGistList() {
  const token = getToken();
  if (!token) return;
  const listEl = document.getElementById('gistList');
  listEl.textContent = 'Loading…';
  try {
    const gists = await listGists(token);
    listEl.innerHTML = '';
    if (!gists.length) {
      listEl.textContent = 'No saved gists.';
    } else {
      const panel = document.getElementById('gistLoadPanel');
      gists.forEach(g => {
        const fileNames = Object.keys(g.files).join(', ');
        const item = document.createElement('div');
        item.className = 'gist-list-item';
        item.innerHTML = `
          <div class="gist-list-item-body">
            <div>${fileNames}</div>
            <div class="gist-item-id">${g.id}</div>
          </div>
          <button class="gist-list-delete" title="Delete gist"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg></button>`;
        item.querySelector('.gist-list-item-body').addEventListener('click', async () => {
          try {
            const full = await loadGistById(g.id, token);
            applyGistToTabs(full);
            setCurrentGist(g.id);
            panel.classList.add('hidden');
          } catch (e) { setStatus(e.message, 'error'); }
        });
        item.querySelector('.gist-list-delete').addEventListener('click', async (e) => {
          e.stopPropagation();
          if (!confirm(`Delete gist ${g.id}?`)) return;
          try {
            await deleteGistById(token, g.id);
            if (currentGistId === g.id) setCurrentGist(null);
            item.remove();
            if (!listEl.children.length) listEl.textContent = 'No saved gists.';
          } catch (e) { setStatus(e.message, 'error'); }
        });
        listEl.appendChild(item);
      });
    }
  } catch (e) {
    listEl.textContent = e.message;
  }
}

document.getElementById('gistLoadBtn').addEventListener('click', async () => {
  const panel = document.getElementById('gistLoadPanel');
  const isOpen = !panel.classList.contains('hidden');
  panel.classList.toggle('hidden', isOpen);
  if (!isOpen) populateGistList();
});

// Update button label based on whether input has content
const gistIdInput = document.getElementById('gistIdInput');
const gistLoadByIdBtn = document.getElementById('gistLoadById');
const SVG_RELOAD = `<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M8 16H3v5"/></svg>`;
gistIdInput.addEventListener('input', () => {
  gistLoadByIdBtn.innerHTML = gistIdInput.value.trim() ? 'Load' : `${SVG_RELOAD} Reload`;
});

document.getElementById('gistLoadById').addEventListener('click', async () => {
  const raw = gistIdInput.value.trim();
  if (!raw) {
    // Empty input — reload the list
    populateGistList();
    return;
  }
  // Accept full URL or bare ID
  const idMatch = raw.match(/([a-f0-9]{20,})/i);
  if (!idMatch) { setStatus('Invalid gist ID', 'error'); return; }
  const id = idMatch[1];
  try {
    const gist = await loadGistById(id, getToken());
    applyGistToTabs(gist);
    setCurrentGist(id);
    document.getElementById('gistLoadPanel').classList.add('hidden');
  } catch (e) {
    setStatus(e.message, 'error');
  }
});

// ─── Delete Gist ──────────────────────────────────────────────────────────────

document.getElementById('gistDeleteBtn').addEventListener('click', async () => {
  if (!currentGistId) return;
  if (!confirm(`Delete gist ${currentGistId}?`)) return;
  const token = getToken();
  try {
    await deleteGistById(token, currentGistId);
    setCurrentGist(null);
    setStatus('Gist deleted', 'success');
  } catch (e) {
    setStatus(e.message, 'error');
  }
});

// ─── Init ─────────────────────────────────────────────────────────────────────

const defaultSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id":        { "type": "integer", "minimum": 1, "maximum": 1000 },
    "name":      { "type": "string", "minLength": 5, "maxLength": 50 },
    "email":     { "type": "string", "format": "email" },
    "role":      { "type": "string", "enum": ["admin", "user", "guest"] },
    "createdAt": { "type": "string", "format": "date-time" },
    "active":    { "type": "boolean" },
    "score":     { "type": "number", "minimum": 0, "maximum": 100, "multipleOf": 0.5 }
  },
  "required": ["id", "name", "email", "role"]
};

// Restore tabs from localStorage, or use default schema; handle #gist/<id>
(async function initTabs() {
  // Restore token state
  const storedToken = getToken();
  if (storedToken) applyToken(storedToken);
  updateGistButtons();

  // Check for #gist/<id> in URL
  const gistHashMatch = window.location.hash.match(/^#gist\/([a-f0-9]+)$/i);
  if (gistHashMatch) {
    const id = gistHashMatch[1];
    document.getElementById('playground').classList.add('section-active');
    openDocsDialog();
    try {
      const gist = await loadGistById(id, storedToken);
      applyGistToTabs(gist);
      setCurrentGist(id);
      return;
    } catch (e) {
      setStatus(`Failed to load gist: ${e.message}`, 'error');
    }
  }

  // Restore from localStorage
  try {
    const saved = localStorage.getItem('jsf_tabs');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        tabs = parsed.map(t => makeTab(t.name, t.content, t.id));
        const savedActive = parseInt(localStorage.getItem('jsf_activeTab'));
        activeTabId = tabs.find(t => t.id === savedActive) ? savedActive : tabs[tabs.length - 1].id;
        inputEditor.setValue(getActiveTab().content, -1);
        renderTabs();
        generateOutput();
        return;
      }
    }
  } catch {}

  tabs = [makeTab('schema.json', JSON.stringify(defaultSchema, null, 2))];
  activeTabId = tabs[0].id;
  inputEditor.setValue(tabs[0].content, -1);
  renderTabs();
  generateOutput();
})();

// Highlight TOC links when their section anchors enter the viewport
(function setupTocObserver() {
  const anchors = document.querySelectorAll('#docs [id^="docs-"], #examples [id^="ex-"]');
  if (!anchors.length) return;

  const tocLinks = document.querySelectorAll('nav a[href^="#docs-"], nav a[href^="#ex-"], div a[href^="#docs-"], div a[href^="#ex-"]');

  function setActive(id) {
    tocLinks.forEach(a => {
      if (a.getAttribute('href') === '#' + id) {
        a.classList.add('toc-active');
      } else {
        a.classList.remove('toc-active');
      }
    });
  }

  // Track which anchors are visible; activate the topmost one
  const visible = new Set();

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        visible.add(entry.target.id);
      } else {
        visible.delete(entry.target.id);
      }
    });

    if (visible.size === 0) return;

    // Pick the topmost visible anchor in DOM order
    let topId = null;
    anchors.forEach(anchor => {
      if (visible.has(anchor.id) && topId === null) topId = anchor.id;
    });
    if (topId) setActive(topId);
  }, { rootMargin: '0px 0px -60% 0px', threshold: 0 });

  anchors.forEach(anchor => observer.observe(anchor));
})();
