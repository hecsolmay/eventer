'use client'

import { Input } from '@nextui-org/input'

import { SearchIcon } from '@/components/icons'

export default function SearchInput () {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData  = new FormData(event.currentTarget)
    const searchTerm = formData.get('search')

    alert('Search term: ' + searchTerm)
    // TODO: Implement search functionality
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        aria-label='Search'
        classNames={{
          inputWrapper: 'bg-default-100',
          input: 'text-sm'
        }}
        labelPlacement='outside'
        name='search'
        placeholder='Buscar un evento...'
        startContent={
          <SearchIcon className='pointer-events-none shrink-0 text-base text-default-400' />
        }
        type='search'
      />
    </form>
  )
}
