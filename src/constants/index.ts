import { SortFilterSelect, StatusFilterSelect } from '@/types'

export const SORTS: SortFilterSelect[] = [
  { value: 'event-desc', label: 'Próximos eventos' },
  { value: 'event-asc', label: 'Eventos mas antiguos' }
]

export const STATUS_FILTERS: StatusFilterSelect[] = [
  { value: 'ACTIVE', label: 'Activos' },
  { value: 'INACTIVE', label: 'Inactivos' },
  { value: 'CANCELED', label: 'Cancelados' },
  { value: 'CONCLUDED', label: 'Concluidos' }
]

export const STATUS_SELECT_OPTIONS: StatusFilterSelect[] = [
  { value: 'ACTIVE', label: 'Activo' },
  { value: 'INACTIVE', label: 'Inactivo' },
  { value: 'CANCELED', label: 'Cancelado' },
  { value: 'CONCLUDED', label: 'Concluido' }
]

export const DEFAULT_LAT = 20.965943004395623
export const DEFAULT_LNG = -89.60612297058107
export const DEFAULT_ZOOM = 20
