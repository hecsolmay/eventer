'use client'

import { Select, SelectItem } from '@nextui-org/react'

import { STATUS_FILTERS } from '@/constants'
import useQuery from '@/hooks/useQuery'
import { getStatusFilterSelect } from '@/utils/filters'

export default function StatusFilter () {
  const { createQueryString, router, searchParams, pathname } = useQuery()

  const createHandleChange = (value: string) => () => {
    router.push(pathname + '?' + createQueryString('status', value))
  }

  const selectedSort = getStatusFilterSelect(searchParams.get('status'))
  const selectedKeys = selectedSort?.value ? [selectedSort.value] : []

  return (
    <Select
      className='max-w-40'
      label='Filtra por estado:'
      placeholder={STATUS_FILTERS.map(status => status.label).join(', ')}
      selectedKeys={selectedKeys}
      size='sm'
    >
      {STATUS_FILTERS.map(status => (
        <SelectItem key={status.value} onClick={createHandleChange(status.value)}>
          {status.label}
        </SelectItem>
      ))}
    </Select>
  )
}