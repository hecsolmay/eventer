'use client'

import { Input } from '@nextui-org/input'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { SearchIcon } from '@/components/icons'

interface SearchInputProps {
  closeMenu: () => void
}

export default function SearchInput ( { closeMenu }: SearchInputProps ) {
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const cleanSearchTerm = searchTerm.trim()

    if (cleanSearchTerm === '') {
      return
    }

    router.push('/events?q=' + cleanSearchTerm)
    closeMenu()
  }

  return (
    <form onSubmit={handleSubmit}>
      <Input
        aria-label='Search'
        autoComplete='off'
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
        onChange={event => setSearchTerm(event.target.value)}
      />
    </form>
  )
}
