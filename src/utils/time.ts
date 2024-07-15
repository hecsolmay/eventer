import { DateValue, getLocalTimeZone, now, parseDate } from '@internationalized/date'

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

export function getParsedDateValue (date?: string | undefined | Date): DateValue {
  try {
    if (date instanceof Date) {
      return parseDate(date.toISOString().split('T')[0])
    }

    return parseDate(date ?? new Date().toISOString().split('T')[0])
  } catch (error) {
    return parseDate(new Date().toISOString().split('T')[0])
  }
}

export function DateValueToDate (date: DateValue): Date {
  return date.toDate(getLocalTimeZone())
}

export function getNowDateValue (): DateValue {
  return now(getLocalTimeZone())
}