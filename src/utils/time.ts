import {
  DateValue,
  getLocalTimeZone,
  now,
  parseDate,
  ZonedDateTime
} from '@internationalized/date'

export function formatEventDate (date: Date) {
  const dateString = date.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    localeMatcher: 'lookup'
  })

  return dateString
}

export function formatEventTime (date: Date) {
  const dateString = date.toLocaleTimeString('es-MX', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  })

  return dateString
}

export function getParsedDateValue (
  date?: string | undefined | Date
): DateValue {
  try {
    if (date instanceof Date) {
      return parseDate(date.toISOString().split('T')[0])
    }

    return parseDate(date ?? new Date().toISOString().split('T')[0])
  } catch (error) {
    return parseDate(new Date().toISOString().split('T')[0])
  }
}

export function parseDateToDateValue (date: Date): ZonedDateTime {
  const timeZone = getLocalTimeZone()
  const offsetInMinutes = date.getTimezoneOffset()
  const offsetInMilliseconds = -offsetInMinutes * 60 * 1000

  const zoneTime = new ZonedDateTime(
    date.getFullYear(),
    date.getMonth() + 1, // Los meses en JavaScript son 0-indexados
    date.getDate(),
    timeZone,
    offsetInMilliseconds,
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
    date.getMilliseconds()
  )

  return zoneTime
}

export function DateValueToDate (date: DateValue): Date {
  return date.toDate(getLocalTimeZone())
}

export function getNowDateValue (): DateValue {
  return now(getLocalTimeZone())
}
