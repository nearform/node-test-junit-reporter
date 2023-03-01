#!/bin/bash
set -e

# Function to replace test duration with 0 and remove file paths
remove_variables() {
  echo "$1" | sed -E 's/time=\"[0-9\.]+\"/time=\"0\"/g' | sed -E 's/\/.*\/test\//test\//g'
}

# Run sample tests and generate the report, ignoring errors
report=$(node --test --test-reporter ./index.js ./test/resources/sample-tests || true)

# Compare with expected results
expected=$(cat ./test/resources/expected.xml)
diff <(remove_variables "$report") <(remove_variables "$expected")
