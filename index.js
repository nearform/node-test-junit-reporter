import parseReport from 'node-test-parser'
import buildXml from './lib/build-xml.js'

export default async function* junitReporter(source) {
  const reportData = await parseReport(source)
  const xml = buildXml(reportData)
  yield xml
}
