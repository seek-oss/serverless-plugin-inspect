SHELL = /bin/bash
ifdef TEAMCITY_VERSION
	MOCHA_REPORTER="mocha-teamcity-reporter"
else
	MOCHA_REPORTER="spec"
endif

.PHONY: all clean dist-clean compile test build deploy

all: build

clean:
	rm -rf dist/

dist-clean: clean
	rm -fr node_modules/

test: node_modules dist
	./node_modules/.bin/mocha --compilers js:babel-register --reporter $(MOCHA_REPORTER)

deploy: #clean test
	./node_modules/.bin/serverless deploy

build: dist

node_modules:
	npm install


compile: node_modules
	./node_modules/.bin/npm-lint-locked
	./node_modules/.bin/eslint src
	./node_modules/.bin/eslint test
	./node_modules/.bin/babel src -d dist

dist: node_modules package.json $(wildcard src/*.js)
	mkdir -p dist
	./node_modules/.bin/babel src -d dist
	cp package.json dist/
	cd dist/; npm install --production; rm package.json
