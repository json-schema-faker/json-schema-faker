# defaults
src := build
target := gh-pages
message := Release: $(shell date)

.PHONY: dev test test_all coverage coverage_all typecheck build build_clean watch debug lint check ci help

dev:
	tequio-dev

test:
	bun test

test_all:
	NO_SKIP=1 bun test

coverage:
	bun run test:coverage

coverage_all:
	bun run test:coverage:all

typecheck:
	tsc --noEmit

build:
	bun run build

build_clean:
	rm -rf dist && bun run build

watch:
	bun --watch test

debug:
	bun test --inspect-brk

lint:
	bun run lint 2>/dev/null || echo "No lint script"

pages:
	@(git worktree remove $(src) --force > /dev/null 2>&1) || true
	@git worktree add $(src) $(target)
	@cd $(src) && rm -rf *
	@cp -r public/* $(src)

deploy:
	@cd $(src) && git add . && git commit -m "$(message)"
	@git push origin $(target) -f

check: typecheck test

ci: typecheck test_all build

help:
	@echo "Available targets:"
	@echo "  make dev          - Run development mode (tequio-dev)"
	@echo "  make test         - Run tests"
	@echo "  make test_all     - Run all tests including skipped"
	@echo "  make coverage     - Run tests with coverage (text + lcov)"
	@echo "  make coverage_all - Run all tests including skipped with coverage"
	@echo "  make typecheck    - Run TypeScript type checking"
	@echo "  make build        - Build the project"
	@echo "  make build_clean  - Clean and rebuild"
	@echo "  make watch        - Watch mode for tests"
	@echo "  make debug        - Run tests with debugger"
	@echo "  make lint         - Run linter"
	@echo "  make check        - Run typecheck + test"
	@echo "  make ci           - Full CI check (typecheck + test_all + build)"
