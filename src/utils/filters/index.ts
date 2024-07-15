import { SORTS, STATUS_FILTERS } from '@/constants'

export function getSortFilterSelect (sortKey?: string | null) {
  return SORTS.find(sort => sort.value === sortKey)
}

export function getStatusFilterSelect (statusKey?: string | null) {
  return STATUS_FILTERS.find(status => status.value === statusKey)
}