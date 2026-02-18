# Contributing to json-schema-faker

Thank you for your interest in contributing to json-schema-faker!

## Project Overview

**json-schema-faker v6** - A TypeScript implementation with Bun runtime that generates valid JSON data from JSON Schema definitions. Zero production dependencies.

## Quick Start

```bash
# Clone and install
git clone https://github.com/json-schema-faker/json-schema-faker.git
cd json-schema-faker
bun install

# Development
make dev          # Run development mode
make test         # Run tests
make typecheck    # TypeScript type checking

# Full check before submitting
make ci
```

## Quality Requirements

All contributions **must** pass these checks before being merged:

```bash
make ci  # Runs: typecheck + test_all + build
```

Or run individually:
```bash
make typecheck   # Must pass with no errors
make test_all    # All tests including skipped must pass
make build       # Must produce valid output
```

### Code Style

- **TypeScript** with strict mode enabled
- **ES modules** with `.js` extension in imports
- **Functional style** - state passed via context objects
- No comments unless absolutely necessary
- Use existing patterns in the codebase

### Testing

- All new features require tests
- Bug fixes require tests that fail before the fix and pass after
- Tests use Bun test runner with AJV 2020-12 for validation
- Run `make test_all` to include skipped tests during development

## Project Structure

```
src/
├── index.ts          # Public API exports
├── types.ts          # TypeScript type definitions
├── schema-walker.ts  # Main schema traversal
├── ref-resolver.ts   # $ref resolution with cycle detection
├── remote-resolver.ts # External schema fetching
├── merge.ts          # Schema merging for allOf/anyOf/oneOf
├── random.ts         # Mulberry32 seeded PRNG
├── generators/       # Type-specific generators
│   ├── null.ts
│   ├── boolean.ts
│   ├── integer.ts
│   ├── number.ts
│   ├── string.ts
│   ├── array.ts
│   ├── object.ts
│   ├── enum-const.ts
│   └── composition.ts
├── formats/          # Built-in format generators
└── pattern/          # Regex-based string generation

tests/
├── unit/             # Unit tests per feature
├── integration/     # Integration tests
├── schema-faker-tests/ # Compatibility tests from v5
└── helpers/         # Test utilities
```

## Adding New Features

### New Type Generator

1. Add type to `src/types.ts` if needed
2. Create generator in `src/generators/<type>.ts`
3. Register in `src/schema-walker.ts`
4. Add tests in `tests/unit/`

### New Format

1. Add generator in `src/formats/`
2. Register in `src/formats/index.ts`
3. Add tests

### Bug Fixes

1. Create a failing test that reproduces the issue
2. Fix the bug
3. Ensure test passes
4. Run `make ci` to verify everything works

## Submitting Changes

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make changes following the code style
4. Run `make ci` to verify all checks pass
5. Commit with descriptive messages
6. Push to your fork
7. Open a pull request

## Commit Messages

Use clear, descriptive commit messages:
- `fix: resolve circular $ref detection`
- `feat: add support for if/then/else`
- `test: add coverage for array minItems`

## Getting Help

- Open an issue for bugs or feature requests
- Check existing issues before creating new ones
- Use the Discussions for questions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
