import DateFilter from '@/components/date-picker'
import SortFilter from '@/components/sort-filter'
import StatusFilter from '@/components/status-filter'

export default function EventFilters () {
  return (
    <div className='flex w-full flex-wrap justify-between gap-4 py-3'>
      <div className='w-40 md:flex-1'>
        <StatusFilter />
      </div>

      <div className='flex w-full flex-wrap-reverse justify-end gap-4 md:flex-1 md:flex-nowrap'>
        <div className='w-full'>
          <DateFilter />
        </div>
        <div className='w-full'>
          <SortFilter />
        </div>
      </div>
    </div>
  )
}
