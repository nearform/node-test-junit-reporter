export default {
  testSuites: [
    {
      name: 'broken.test.js',
      file: 'broken.test.js',
      tests: [
        {
          name: 'calls a nonexistent method',
          file: 'broken.test.js',
          tests: [],
          duration: 0.701375,
          skip: false,
          todo: false,
          error: {
            message: 'nonexistentMethod is not defined',
            failureType: 'testCodeFailure',
            cause: {
              code: 'ERR_TEST_FAILURE'
            },
            code: 'ERR_TEST_FAILURE'
          }
        }
      ],
      duration: 49.375084,
      skip: false,
      todo: false,
      error: {
        failureType: 'subtestsFailed',
        cause: 'test failed',
        code: 'ERR_TEST_FAILURE',
        exitCode: 1,
        signal: null
      }
    },
    {
      name: 'nested.test.js',
      file: 'nested.test.js',
      tests: [
        {
          name: 'module',
          file: 'nested.test.js',
          tests: [
            {
              name: 'function',
              file: 'nested.test.js',
              tests: [
                {
                  name: 'behavior',
                  file: 'nested.test.js',
                  tests: [
                    {
                      name: 'asserts 1 === 1',
                      file: 'nested.test.js',
                      tests: [],
                      duration: 0.135625,
                      skip: false,
                      todo: false
                    },
                    {
                      name: 'fails',
                      file: 'nested.test.js',
                      tests: [],
                      duration: 0.792542,
                      skip: false,
                      todo: false,
                      failure: {
                        message: `Expected values to be strictly equal:

          1 !== 2`,
                        failureType: 'testCodeFailure',
                        cause: {
                          generatedMessage: false,
                          code: 'ERR_ASSERTION',
                          actual: 1,
                          expected: 2,
                          operator: 'strictEqual'
                        },
                        code: 'ERR_TEST_FAILURE'
                      }
                    }
                  ],
                  duration: 1.733084,
                  skip: false,
                  todo: false,
                  error: {
                    failureType: 'subtestsFailed',
                    cause: {
                      code: 'ERR_TEST_FAILURE'
                    },
                    code: 'ERR_TEST_FAILURE'
                  }
                }
              ],
              duration: 2.067708,
              skip: false,
              todo: false,
              error: {
                failureType: 'subtestsFailed',
                cause: {
                  code: 'ERR_TEST_FAILURE'
                },
                code: 'ERR_TEST_FAILURE'
              }
            }
          ],
          duration: 3.921666,
          skip: false,
          todo: false,
          error: {
            failureType: 'subtestsFailed',
            cause: {
              code: 'ERR_TEST_FAILURE'
            },
            code: 'ERR_TEST_FAILURE'
          }
        }
      ],
      duration: 48.796375,
      skip: false,
      todo: false,
      error: {
        failureType: 'subtestsFailed',
        cause: 'test failed',
        code: 'ERR_TEST_FAILURE',
        exitCode: 1,
        signal: null
      }
    },
    {
      name: 'skip.test.js',
      file: 'skip.test.js',
      tests: [
        {
          name: 'behavior',
          file: 'skip.test.js',
          tests: [
            {
              name: 'skipped test',
              file: 'skip.test.js',
              tests: [],
              duration: 0.20925,
              skip: true,
              todo: false
            }
          ],
          duration: 2.491,
          skip: false,
          todo: false
        }
      ],
      duration: 44.290208,
      skip: false,
      todo: false
    }
  ],
  duration: 438.0355
}
