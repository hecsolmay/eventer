'use client'

import { DateValue } from '@internationalized/date'
import { DatePicker } from '@nextui-org/react'
import { useState } from 'react'

import useQuery from '@/hooks/useQuery'
import {
  DateValueToDate,
  getParsedDateValue
} from '@/utils/time'

export default function DateFilter () {
  const { createQueryString, router, searchParams, pathname } = useQuery()
  const [value, setValue] = useState<DateValue | null>(() => {
    const date = searchParams.get('date')

    if (date === null) return null

    return getParsedDateValue(date)
  })

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

interface DateInputWithHoursProps {
  onChange: (date: DateValue) => void
  value: DateValue
}

export function DateInputWithHours ( { onChange, value }: DateInputWithHoursProps ) {

  return (
    <div className='flex w-full flex-row gap-4'>
      <DatePicker
        hideTimeZone
        showMonthAndYearPickers
        className='h-12'
        hourCycle={12}
        label='Selecciona una fecha para el evento'
        value={value}
        variant='bordered'
        onChange={onChange}
      />
    </div>
  )
}
