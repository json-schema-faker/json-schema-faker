# current working directory
PWD=$(shell pwd)

# defaults
src := build
target := gh-pages
message := Release: $(shell date)

# environment vars
PORT ?= 8080
NODE_ENV ?= development
VERSION ?= $(shell cat package.json | jq .version | xargs)

ifneq ($(wildcard .env),)
include .env
endif

# export vars
.EXPORT_ALL_VARIABLES:

# targets
.PHONY: ? deps purge all clean deploy

# utils
define iif
	@(($(1) > /dev/null 2>&1) && printf "\r* $(2)\n") || printf "\r* $(3)\n"
endef

# display all targets-with-help in this file
?: Makefile
	@awk -F':.*?##' '/^[a-z\\%!:-]+:.*##/{gsub("%","*",$$1);gsub("\\\\",":*",$$1);printf "\033[36m%8s\033[0m %s\n",$$1,$$2}' $<

ci:
	@npm run test:ci && npm run codecov

lib: deps ## Build library output only
	@npm run build -- -y main

dev: deps ## Watch and start development server
	@npm run watch

test: deps ## Run tests like if we're in CI ;-)
	@npm run test:schema

build: deps ## Build scripts for dist
	@npm run build

all: deps ## Build artifact for production envs
	@(git worktree remove $(src) --force > /dev/null 2>&1) || true
	@git worktree add $(src) $(target)
	@cd $(src) && rm -rf * && git checkout -- vendor
	@cp -r public/* $(src)
	@npm run build

clean: ## Remove cache and generated artifacts
	@$(call iif,rm -r $(src) dist,Built artifacts were deleted,Artifacts already deleted)
	@$(call iif,unlink .tarima,Cache file was deleted,Cache file already deleted)

deploy: ## Push built artifacts to github!
	@cd $(src) && git add . && git commit -m "$(message)"
	@git push origin $(target) -f

deps: ## Check for installed dependencies
	@(((ls node_modules | grep .) > /dev/null 2>&1) || npm i) || true
	@(((ls bower_components | grep .) > /dev/null 2>&1) || bower i) || true
	@(((ls dist | grep main.umd.js) > /dev/null 2>&1) || npm run build) || true

purge: clean ## Remove all from node_modules/*
	@printf "\r* Removing all dependencies... "
	@rm -rf node_modules/.{bin,cache}
	@rm -rf node_modules/*
	@echo "OK"
