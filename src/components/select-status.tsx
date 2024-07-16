'use client'

import { Select, SelectItem } from '@nextui-org/react'
import { EVENT_STATE } from '@prisma/client'

import { STATUS_SELECT_OPTIONS } from '@/constants'

interface SelectStatusProps {
  value?: EVENT_STATE
  onChange?: (value: EVENT_STATE) => void
}

export default function SelectStatus ({ value, onChange }: SelectStatusProps) {
  const selectedKeys = value !== undefined ? [value] : []

  return (
    <Select
      label='Estado del evento'
      placeholder='Selecciona el estado del evento'
      selectedKeys={selectedKeys}
      value={EVENT_STATE.ACTIVE}
      variant='bordered'
    >
      {STATUS_SELECT_OPTIONS.map(status => (
        <SelectItem
          key={status.value}
          onClick={() => {
            onChange?.(status.value)
          }}
        >
          {status.label}
        </SelectItem>
      ))}
    </Select>
  )
}
