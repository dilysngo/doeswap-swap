/* eslint-disable */
import { sum } from 'lodash'
const momentTimezone = require('moment-timezone')

const isMobile = () => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if (isMobile) {
    return true
  }
  return false
}

const removeEmpty = (obj) =>
  Object.entries(obj)
    .map(([k, v]) => [k, v && typeof v === 'object' ? removeEmpty(v) : v])
    .reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {})

function roundNumber(n, scale = 3) {
  const num = parseFloat(n) === 'NaN' ? 0 : parseFloat(n)
  if (!('' + num).includes('e')) {
    return +(Math.round(num + 'e+' + scale) + 'e-' + scale)
  } else {
    var arr = ('' + num).split('e')
    var sig = ''
    if (+arr[1] + scale > 0) {
      sig = '+'
    }
    return +(Math.round(+arr[0] + 'e' + sig + (+arr[1] + scale)) + 'e-' + scale)
  }
}

const formatDate = (date, format = 'HH:mm DD/MM/YYYY') => {
  // const country = JSON.parse(localStorage.getItem("userInfo"));
  const country = 'Asia/Ho_Chi_Minh'
  if (date) {
    const tz = momentTimezone(date)
    const time = tz.tz(country).format(format)
    return time
  }
  return ''
}

const formatCode = (text, start, end, concat) => {
  const total = sum([start, end])
  const length = text.length
  if (total >= length) {
    return text
  }
  return [text.slice(0, start), text.slice(length - end)].join(concat)
}

export { isMobile, removeEmpty, roundNumber, formatDate, formatCode }
