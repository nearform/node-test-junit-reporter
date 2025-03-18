import { execSync } from 'child_process'

try {
  // Run sample tests and generate the report, ignoring errors
  let report = ''
  try {
    report = execSync('node --test --test-reporter ./index.js **/*.test.js', {
      encoding: 'utf8'
    })
  } catch (error) {
    report = error.stdout || ''
  }

  // Validate report against schema
  try {
    execSync(
      `echo "${report}" | xmllint --schema ./test/resources/junit.xsd --noout -`,
      { stdio: 'inherit' }
    )
    console.log('Report is valid ✅')
  } catch (error) {
    console.error('Report validation failed ❌')
    process.exit(1)
  }
} catch (error) {
  console.error('An error occurred:', error)
  process.exit(1)
}
