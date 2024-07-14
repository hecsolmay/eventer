'use client'

import { Select, SelectItem } from '@nextui-org/react'

import { SORTS } from '@/constants'
import useQuery from '@/hooks/useQuery'
import { getSortFilterSelect } from '@/utils/filters'

export default function SortFilter () {
  const { createQueryString, router, searchParams, pathname } = useQuery()

  const selectedSort = getSortFilterSelect(searchParams.get('sort'))
  const selectedKeys = selectedSort?.value ? [selectedSort.value] : []

  const createHandleChange = (value: string) => () => {
    router.push(pathname + '?' + createQueryString('sort', value))
  }

  return (
    <Select
      className='max-w-52'
      label='Ordenar por:'
      placeholder='selecciona un orden'
      selectedKeys={selectedKeys}
      size='sm'
    >
      {SORTS.map(sort => (
        <SelectItem key={sort.value} onClick={createHandleChange(sort.value)}>
          {sort.label}
        </SelectItem>
      ))}
    </Select>
  )
}
