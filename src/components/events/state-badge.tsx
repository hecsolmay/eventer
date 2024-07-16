import { EVENT_STATE } from '@prisma/client'

import { IconSvgProps } from '@/types'
import { cn } from '@/utils/cn'
import {
  CalendarCheckIcon,
  CheckBadgeIcon,
  PauseIcon,
  XMarkIcon
} from '@/components/icons'

interface StatusBadgeProps {
  status: EVENT_STATE
  className?: string
}

const STATUS_TEXT: Record<EVENT_STATE, string> = {
  ACTIVE: 'Activo',
  INACTIVE: 'Inactivo',
  CANCELED: 'Cancelado',
  CONCLUDED: 'Concluido'
}

const STATUS_ICONS: Record<EVENT_STATE, React.FC<IconSvgProps>> = {
  ACTIVE: CalendarCheckIcon,
  INACTIVE: PauseIcon,
  CANCELED: XMarkIcon,
  CONCLUDED: CheckBadgeIcon
}

const STATUS_COLORS: Record<EVENT_STATE, string> = {
  ACTIVE: 'bg-primary',
  INACTIVE: 'bg-amber-400 dark:bg-amber-500',
  CANCELED: 'bg-red-500 dark:bg-red-600',
  CONCLUDED: 'bg-green-500 dark:bg-green-600'
}

export function StatusBadge ({ status, className }: StatusBadgeProps) {
  const Icon = STATUS_ICONS[status]

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-primary-foreground',
        STATUS_COLORS[status],
        className
      )}
    >
      <Icon className='size-4' />
      {STATUS_TEXT[status]}
    </div>
  )
}
