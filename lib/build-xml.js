import xml from 'xml'
import strip from './utils/strip.js'

export default function buildXml(reportData) {
  const flattenedSuites = reportData.testSuites.map(suite => ({
    ...suite,
    tests: flattenTests(suite)
  }))

  return xml(
    [
      {
        testsuites: [
          {
            _attr: {
              name: 'node tests',
              time: reportData.duration,
              tests: flattenedSuites.reduce(
                (acc, suite) => acc + suite.tests.length,
                0
              ),
              errors: flattenedSuites.reduce(
                (acc, suite) =>
                  acc + suite.tests.filter(test => test.error).length,
                0
              ),
              failures: flattenedSuites.reduce(
                (acc, suite) =>
                  acc + suite.tests.filter(test => test.failure).length,
                0
              )
            }
          },
          ...flattenedSuites.map(suite => ({
            testsuite: [
              {
                _attr: {
                  name: strip(suite.name),
                  time: suite.duration,
                  tests: suite.tests.length,
                  errors: suite.tests.filter(test => test.error).length,
                  failures: suite.tests.filter(test => test.failure).length,
                  skipped: suite.tests.filter(test => test.skip).length
                }
              },
              ...suite.tests.map(test => ({
                testcase: [
                  { _attr: { name: strip(test.name), time: test.duration } },
                  ...[
                    test.error ? { error: formatError(test) } : false,
                    test.failure ? { failure: formatFailure(test) } : false,
                    test.skip ? { skipped: {} } : false
                  ].filter(Boolean)
                ]
              }))
            ]
          }))
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
  const {
    diagnostic,
    error: { message, stack }
  } = test

  let errorMessage = message

  if (diagnostic) {
    errorMessage += `\n\n${diagnostic}`
  }

  if (stack) {
    errorMessage += `\n\nStack:\n${stack}`
  }

  return strip(errorMessage)
}

function formatFailure(test) {
  const {
    failure: { message, stack }
  } = test

  let failureMessage = message

  if (stack) {
    failureMessage += `\n\nStack:\n${stack}`
  }

  return strip(failureMessage)
}
