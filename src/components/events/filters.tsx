import DateFilter from '@/components/date-picker'
import SortFilter from '@/components/sort-filter'

export default function EventFilters () {
  return (
    <div className='flex w-full flex-wrap justify-end gap-4 py-3'>
      <DateFilter />
      <SortFilter />
    </div>
  )
}
