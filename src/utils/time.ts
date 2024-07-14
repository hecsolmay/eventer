export function formatEventDate (date: Date) {
  const dateString = date.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    localeMatcher: 'lookup'
  })

  return dateString
}
