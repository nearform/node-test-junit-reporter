import StackUtils from 'stack-utils'
import xml from 'xml'
import strip from './utils/strip.js'

const stackUtils = new StackUtils({
  cwd: process.cwd(),
  internals: StackUtils.nodeInternals()
})

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
              time: reportData.duration / 1000,
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
                  time: reportData.duration / 1000,
                  tests: totalTests,
                  errors: totalErrors,
                  failures: totalFailures,
                  skipped: totalSkipped
                }
              },
              ...flattenedTests.map(test => ({
                testcase: [
                  {
                    _attr: {
                      name: strip(test.name),
                      time: test.duration / 1000
                    }
                  },
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
  const { message, cause = {} } = error
  const stack = cause.stack || error.stack

  let errorMessage = message

  if (test.diagnostic) {
    errorMessage += `\n\n${test.diagnostic}`
  }

  if (stack) {
    const cleanStack = stackUtils.clean(stack)

    if (cleanStack) {
      errorMessage += `\n\nStack:\n${cleanStack}`
    }
  }

  return strip(errorMessage)
}
