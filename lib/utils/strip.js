import stripAnsi from 'strip-ansi'

export default function strip(str) {
  //eslint-disable-next-line no-control-regex
  return stripAnsi(str).replace(/\u001b/g, '')
}
