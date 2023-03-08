# node-test-junit-reporter

A JUnit test reporter for the Node.js test runner

![CI](https://github.com/nearform/node-test-junit-reporter/actions/workflows/ci.yml/badge.svg?event=push)

## Installation

```shell
npm i -D node-test-junit-reporter
```

## Usage

```shell
node --test --test-reporter node-test-junit-reporter --test-reporter-destination report.xml
```

You can also have a different test reporter output to *stdout* while still saving the JUnit report to a file:

```shell
node --test --test-reporter tap --test-reporter-destination stdout --test-reporter node-test-junit-reporter --test-reporter-destination report.xml
```
