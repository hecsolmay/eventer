'use client'

import { DateValue } from '@internationalized/date'
import { DatePicker } from '@nextui-org/react'
import { useState } from 'react'

import useQuery from '@/hooks/useQuery'
import {
  DateValueToDate,
  getNowDateValue,
  getParsedDateValue
} from '@/utils/time'

export default function DateFilter () {
  const { createQueryString, router, searchParams, pathname } = useQuery()
  const [value, setValue] = useState<DateValue>(
    getParsedDateValue(searchParams.get('date') ?? undefined)
  )

  const handleChange = (date: DateValue) => {
    setValue(date)
    const newDate = DateValueToDate(date)
    const formattedDate = newDate.toISOString().split('T')[0]

    router.push(pathname + '?' + createQueryString('date', formattedDate))
  }

  return (
    <div className='w-full max-w-[284px]'>
      <DatePicker
        hideTimeZone
        showMonthAndYearPickers
        className='h-12'
        label='Eventos a partir de:'
        value={value}
        variant='bordered'
        onChange={handleChange}
      />
    </div>
  )
}

export function DateInputWithHours () {
  const [value, setValue] = useState<DateValue>(getNowDateValue())

  return (
    <div className='flex w-full max-w-[284px] flex-row gap-4'>
      <DatePicker
        hideTimeZone
        showMonthAndYearPickers
        className='h-12'
        hourCycle={12}
        label='Selecciona una fecha para el evento'
        value={value}
        variant='bordered'
        onChange={setValue}
      />
    </div>
  )
}
