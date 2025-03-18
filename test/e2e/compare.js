import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import assert from 'node:assert'

// Function to replace test duration with 0
const removeVariables = input => input.replace(/time="[0-9.]+"/g, 'time="0"')

// Run sample tests and generate the report, ignoring errors
let report = ''
try {
  report = execSync('node --test --test-reporter ./index.js **/*.test.js', {
    encoding: 'utf8'
  })
} catch (error) {
  report = error.stdout || ''
}

// Read expected results
const expected = readFileSync('./test/resources/expected.xml', 'utf8')

assert.strictEqual(
  removeVariables(report).replace(/file:\/\/\//g, 'file://'),
  removeVariables(expected).replace(/\n$/g, ''),
  'Test output does NOT match expected results ❌'
)

console.log('Test output matches expected results ✅')
