import { SortFilterSelect, StatusFilterSelect } from '@/types'

export const SORTS: SortFilterSelect[] = [
  { value: 'created-asc', label: 'Más antiguos' },
  { value: 'created-desc', label: 'Últimos creados' },
  { value: 'eventdata-asc', label: 'Eventos mas lejanos' },
  { value: 'eventdata-desc', label: 'Próximos eventos' }
]

export const STATUS_FILTERS: StatusFilterSelect[] = [
  { value: 'ACTIVE', label: 'Activos' },
  { value: 'INACTIVE', label: 'Inactivos' },
  { value: 'CANCELED', label: 'Cancelados' },
  { value: 'CONCLUSED', label: 'Concluidos' }
]