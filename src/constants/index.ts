import { SortFilterSelect, StatusFilterSelect } from '@/types'

export const SORTS: SortFilterSelect[] = [
  { value: 'created-asc', label: 'Últimos creados' },
  { value: 'created-desc', label: 'Más antiguos' },
  { value: 'eventdata-asc', label: 'Próximos eventos' },
  { value: 'eventdata-desc', label: 'Eventos mas lejanos' }
]

export const STATUS_FILTERS: StatusFilterSelect[] = [
  { value: 'ACTIVE', label: 'Activos' },
  { value: 'INACTIVE', label: 'Inactivos' },
  { value: 'CANCELED', label: 'Cancelados' },
  { value: 'CONCLUSED', label: 'Concluidos' }
]