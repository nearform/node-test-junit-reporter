#!/bin/bash
set -e

# Run sample tests and generate the report, ignoring errors
report=$(node --test --test-reporter ./index.js ./test/resources/sample-tests || true)

# Validate report against schema
echo "$report" | xmllint --schema ./test/resources/junit.xsd --noout -
