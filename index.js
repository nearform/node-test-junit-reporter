import buildReportData from './lib/build-report-data.js'
import buildXml from './lib/build-xml.js'

export default async function* junitReporter(source) {
  const reportData = await buildReportData(source)
  const xml = buildXml(reportData)
  yield xml
}
