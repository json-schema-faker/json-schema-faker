---
name: Bug report
about: Create a report to help us improve
title: ''
labels: 'bug'
assignees: ''
---

## Describe the bug

A clear and concise description of what the bug is.

## Steps to reproduce

1. Use this schema:
```json
{
  "type": "object",
  "properties": {
    "name": { "type": "string" }
  }
}
```

2. Run this code:
```typescript
const result = await generate(schema, { seed: 42 });
```

3. See error/unexpected output

## Expected behavior

A clear and concise description of what you expected to happen.

## Actual behavior

What actually happened (include error message if applicable).

## Output

```json
// Generated output here
```

## Environment

- OS: [e.g., macOS, Linux, Windows]
- Node/Bun version: [e.g., Node 20, Bun 1.2]
- json-schema-faker version: [e.g., 0.6.0]

## Additional context

Add any other context about the problem here.

## Quality Checklist

- [ ] I have verified the issue is not already reported
- [ ] I have included a minimal reproduction schema
- [ ] I have included the actual vs expected output
- [ ] I have tested with `seed` option for reproducibility
