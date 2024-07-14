import { SORTS } from '@/constants'

export function getSortFilterSelect (sortKey?: string | null) {
  return SORTS.find(sort => sort.value === sortKey)
}