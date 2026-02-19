const closeDialogIcon = document.getElementById("x-close-dialog");
const dialogModal = document.getElementById("dialog-modal");

let isOpen;
function toggleDocsDialog() {
  dialogModal.classList.toggle("hidden");
  document.body.classList.toggle("modal-active");
  isOpen = document.body.classList.contains("modal-active");

  if (!isOpen) {
    history.replaceState(null, document.title, '/');
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

const hash = window.location.hash.slice(1);
if (hash === 'docs' || hash === 'examples' || hash === 'playground' ||
    hash.startsWith('docs-') || hash.startsWith('ex-')) {
  openDocsDialog();
}

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
inputEditor.session.setMode('ace/mode/json');
inputEditor.setOptions({
  fontSize: '13px',
  showPrintMargin: false,
  tabSize: 2,
  useSoftTabs: true
});

const outputEditor = ace.edit('outputEditor');
outputEditor.setTheme('ace/theme/github_dark');
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
    .replace(/^\s*\/\/[^\n\r]*/g, '');
}

function parseInput(text) {
  if (inputFormat === 'yaml') {
    return jsyaml.load(text);
  }
  return JSON.parse(stripComments(text));
}

function setInputFormat(fmt) {
  if (fmt === inputFormat) return;
  const prev = inputFormat;
  inputFormat = fmt;

  // Toggle active state on buttons
  document.getElementById('btnFormatJSON').classList.toggle('active', fmt === 'json');
  document.getElementById('btnFormatYAML').classList.toggle('active', fmt === 'yaml');

  // Switch ACE mode
  inputEditor.session.setMode(`ace/mode/${fmt}`);

  // Convert editor content
  const text = inputEditor.getValue();
  try {
    if (fmt === 'yaml' && prev === 'json') {
      const obj = JSON.parse(stripComments(text));
      inputEditor.setValue(jsyaml.dump(obj, { indent: 2 }), -1);
    } else if (fmt === 'json' && prev === 'yaml') {
      const obj = jsyaml.load(text);
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

function makeTab(name, content) {
  return { id: ++tabIdCounter, name, content };
}

// tabs initialized after sampleSchemas is defined (see Init section)
let tabs = [];
let activeTabId = null;

function getActiveTab() {
  return tabs.find(t => t.id === activeTabId);
}

function saveActiveTab() {
  const tab = getActiveTab();
  if (tab) tab.content = inputEditor.getValue();
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
  if (tab && newName.trim()) tab.name = newName.trim();
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
    // Parse all tabs as schemas (active tab uses current format, others always JSON)
    const parsedSchemas = [];
    for (const tab of tabs) {
      try {
        const isActive = tab.id === activeTabId;
        const schema = isActive ? parseInput(tab.content) : JSON.parse(stripComments(tab.content));
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

tabs = [makeTab('schema.json', JSON.stringify(defaultSchema, null, 2))];
activeTabId = tabs[0].id;
inputEditor.setValue(tabs[0].content, -1);

renderTabs();
generateOutput();
