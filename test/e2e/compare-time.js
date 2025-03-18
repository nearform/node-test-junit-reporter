import { execSync } from 'node:child_process'
import assert from 'node:assert'

function getStdout(command) {
  try {
    return execSync(command, {
      encoding: 'utf8'
    })
  } catch (error) {
    return error.stdout || ''
  }
}

const xmlReport = getStdout(
  'node --test --test-reporter ./index.js **/*.test.js'
)

const times = Array.from(xmlReport.matchAll(/time="([^"]+)"/g))

assert.ok(times.length > 0, 'No test times found in the report')

times.forEach(time => {
  const duration = parseFloat(time[1])
  assert(duration < 10, `Test duration ${duration} exceeds 10 seconds`)
})

console.log('All times seem to be valid and in seconds ✅')
