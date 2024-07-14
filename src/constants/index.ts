import { SortFilterSelect } from '@/types'

export const SORTS: SortFilterSelect[] = [
  { value: 'created-asc', label: 'Últimos creados' },
  { value: 'created-desc', label: 'Más antiguos' },
  { value: 'eventdata-asc', label: 'Próximos eventos' },
  { value: 'eventdata-desc', label: 'Eventos mas lejanos' }
]
