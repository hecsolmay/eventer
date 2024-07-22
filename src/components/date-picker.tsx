'use client'

import { DateValue } from '@internationalized/date'
import { DatePicker } from '@nextui-org/react'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

import { XMarkIcon } from '@/components/icons'
import useQuery from '@/hooks/useQuery'
import { DateValueToDate, getParsedDateValue } from '@/utils/time'

const WAIT_TIME = 200

export default function DateFilter () {
  const {
    createQueryString,
    router,
    searchParams,
    pathname,
    removeQueryString
  } = useQuery()
  const [value, setValue] = useState<DateValue | null>(() => {
    const date = searchParams.get('date')

    if (date === null) return null

    return getParsedDateValue(date)
  })

  const handleChange = (date: DateValue) => {
    try {
      setValue(date)
      filterByDate(date)
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e)
    }
  }

  const filterByDate = useDebouncedCallback((date: DateValue) => {
    try {
      const newDate = DateValueToDate(date)
      const formattedDate = newDate.toISOString().split('T')[0]

      router.push(pathname + '?' + createQueryString('date', formattedDate))
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error)
    }
  }, WAIT_TIME)

  const handleClear = () => {
    setValue(null)
    router.push(pathname + '?' + removeQueryString('date'))
  }

  return (
    <div className='relative w-full max-w-[284px]'>
      {value !== null && (
        <button
          className='absolute bottom-1 right-9 z-10 pb-[2px] text-default-500'
          onClick={handleClear}
        >
          <XMarkIcon className='size-5' />
        </button>
      )}
      <DatePicker
        hideTimeZone
        showMonthAndYearPickers
        className='h-12'
        label='Eventos de la fecha:'
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

export function DateInputWithHours ({
  onChange,
  value
}: DateInputWithHoursProps) {
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
