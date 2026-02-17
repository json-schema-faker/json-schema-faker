const closeDialogButton = document.getElementById("close-dialog");
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

closeDialogButton.addEventListener("click", toggleDocsDialog);
dialogModal.addEventListener("click", closeDialog);

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

const sampleSchema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "properties": {
    "id": {
      "type": "integer",
      "minimum": 1,
      "maximum": 1000
    },
    "name": {
      "type": "string",
      "minLength": 5,
      "maxLength": 50
    },
    "email": {
      "type": "string",
      "format": "email"
    },
    "avatar": {
      "type": "string",
      "format": "uri"
    },
    "role": {
      "type": "string",
      "enum": ["admin", "user", "guest"]
    },
    "active": {
      "type": "boolean"
    },
    "createdAt": {
      "type": "string",
      "format": "date-time"
    },
    "tags": {
      "type": "array",
      "items": {
        "type": "string"
      },
      "minItems": 2,
      "maxItems": 5
    },
    "address": {
      "type": "object",
      "properties": {
        "street": { "type": "string" },
        "city": { "type": "string" },
        "country": { "type": "string" },
        "zipCode": { "type": "string", "pattern": "^\\d{5}$" }
      },
      "required": ["city", "country"]
    },
    "score": {
      "type": "number",
      "minimum": 0,
      "maximum": 100,
      "multipleOf": 0.5
    }
  },
  "required": ["id", "name", "email", "role"]
};

inputEditor.setValue(JSON.stringify(sampleSchema, null, 2), -1);

function setStatus(text, type = 'info') {
  const statusEl = document.getElementById('statusText');
  statusEl.textContent = text;
  statusEl.className = type;
}

function getOptions() {
  const options = {};

  const seed = document.getElementById('optSeed').value;
  if (seed) options.seed = parseInt(seed);

  const maxDepth = document.getElementById('optMaxDepth').value;
  if (maxDepth) options.maxDepth = parseInt(maxDepth);

  const optionalsProb = document.getElementById('optOptionalsProb').value;
  if (optionalsProb) options.optionalsProbability = parseFloat(optionalsProb);

  if (document.getElementById('optAlwaysFakeOptionals').checked) {
    options.alwaysFakeOptionals = true;
  }

  if (document.getElementById('optUseExamples').checked) {
    options.useExamplesValue = true;
  }

  return options;
}

async function generateOutput() {
  const startTime = performance.now();
  setStatus('Generating...', 'info');

  try {
    const schemaText = inputEditor.getValue();
    const schema = JSON.parse(schemaText);
    const options = getOptions();

    JSONSchemaFaker.option(options);
    const result = await JSONSchemaFaker.resolve(schema);

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
  inputEditor.setValue(JSON.stringify(sampleSchema, null, 2), -1);
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

generateOutput();
