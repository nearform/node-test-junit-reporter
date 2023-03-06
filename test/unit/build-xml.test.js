import assert from 'node:assert'
import test from 'node:test'
import buildXml from '../../lib/build-xml.js'
import mockedReportData from '../resources/mocked-report-data.js'

test('validates built xml', async () => {
  const xml = buildXml(mockedReportData)

  assert.strictEqual(
    xml,
    `<?xml version="1.0" encoding="UTF-8"?>
<testsuites name="node tests" time="438.0355" tests="4" errors="1" failures="1">
  <testsuite name="broken.test.js" time="49.375084" tests="1" errors="1" failures="0" skipped="0">
    <testcase name="calls a nonexistent method" time="0.701375">
      <error>nonexistentMethod is not defined</error>
    </testcase>
  </testsuite>
  <testsuite name="nested.test.js" time="48.796375" tests="2" errors="0" failures="1" skipped="0">
    <testcase name="module function behavior asserts 1 === 1" time="0.135625">
    </testcase>
    <testcase name="module function behavior fails" time="0.792542">
      <failure>Expected values to be strictly equal:

          1 !== 2</failure>
    </testcase>
  </testsuite>
  <testsuite name="skip.test.js" time="44.290208" tests="1" errors="0" failures="0" skipped="1">
    <testcase name="behavior skipped test" time="0.20925">
      <skipped/>
    </testcase>
  </testsuite>
</testsuites>`
  )
})
