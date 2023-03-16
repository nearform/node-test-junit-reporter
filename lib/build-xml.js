import xml from 'xml'
import strip from './utils/strip.js'

export default function buildXml(reportData) {
  const flattenedTests = flattenTests(reportData)

  const totalTests = flattenedTests.length
  const totalErrors = flattenedTests.filter(test => test.error).length
  const totalFailures = flattenedTests.filter(test => test.failure).length
  const totalSkipped = flattenedTests.filter(test => test.skip).length

  return xml(
    [
      {
        testsuites: [
          {
            _attr: {
              name: 'node tests',
              time: reportData.duration,
              tests: totalTests,
              errors: totalErrors,
              failures: totalFailures
            }
          },
          {
            testsuite: [
              {
                _attr: {
                  name: 'node tests',
                  time: reportData.duration,
                  tests: totalTests,
                  errors: totalErrors,
                  failures: totalFailures,
                  skipped: totalSkipped
                }
              },
              ...flattenedTests.map(test => ({
                testcase: [
                  { _attr: { name: strip(test.name), time: test.duration } },
                  ...[
                    test.error ? { error: formatError(test) } : false,
                    test.failure ? { failure: formatError(test) } : false,
                    test.skip ? { skipped: {} } : false
                  ].filter(Boolean)
                ]
              }))
            ]
          }
        ]
      }
    ],
    { declaration: true, indent: '  ' }
  )
}

function flattenTests(test, prefix = '') {
  if (!test.tests?.length) {
    test.name = prefix
    return [test]
  }

  return test.tests.flatMap(test => {
    return flattenTests(test, prefix ? `${prefix} ${test.name}` : test.name)
  })
}

function formatError(test) {
  const error = test.error || test.failure
  const { message, stack } = error

  let errorMessage = message

  if (test.diagnostic) {
    errorMessage += `\n\n${test.diagnostic}`
  }

  if (stack) {
    errorMessage += `\n\nStack:\n${stack}`
  }

  return strip(errorMessage)
}
