'use client'

import { Input } from '@nextui-org/input'
import { useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import { Spinner } from '@nextui-org/react'

import { SearchIcon } from '@/components/icons'
import { searchLocations } from '@/actions/locations'
import { PlaceInfo } from '@/types/places'

interface SearchLocationProps {
  onLocationSelect: (latlng: { lat: number; lng: number }) => void
  saveLocationInfo: (locationInfo: string) => void
  locationInfo: string | null
}

const WAIT_BETWEEN_SEARCH = 300

export default function SearchLocation ({
  onLocationSelect,
  saveLocationInfo
}: SearchLocationProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [results, setResults] = useState<PlaceInfo[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const divRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }

      return false
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const cleanedSearchTerm = event.currentTarget.value.trim()

    if (cleanedSearchTerm === '') {
      setShowSuggestions(false)
    } else {
      setShowSuggestions(true)
    }
    setSearchTerm(event.currentTarget.value)
    searchLocation(cleanedSearchTerm)
  }

  const handleClickSearchItem = (placeInfo: PlaceInfo) => {
    const { lat, lon, display_name } = placeInfo

    const formattedLocation = {
      lat: Number(lat),
      lng: Number(lon)
    }

    onLocationSelect(formattedLocation)
    saveLocationInfo(display_name)
    setShowSuggestions(false)
  }

  const searchLocation = useDebouncedCallback(async (searchTerm: string) => {
    if (searchTerm === '') return

    setIsLoading(true)
    setError(null)
    setResults([])

    try {
      const result = await searchLocations(searchTerm)

      setResults(result)
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error)
      setError('Algo salió mal al buscar la ubicación')
    } finally {
      setIsLoading(false)
    }
  }, WAIT_BETWEEN_SEARCH)

  const cleanedSearchTerm = searchTerm.trim()

  return (
    <div ref={divRef} className='relative w-full'>
      <Input
        aria-label='Search'
        autoComplete='off'
        classNames={{
          input: 'text-sm'
        }}
        label='Selecciona una ubicación'
        name='search'
        placeholder='Buscar una ubicación...'
        startContent={
          <SearchIcon className='pointer-events-none shrink-0 text-base text-default-400' />
        }
        type='search'
        variant='bordered'
        onChange={handleChange}
      />

      {cleanedSearchTerm !== '' && (
        <div className='scroll-small absolute top-16 z-[99999] max-h-52 w-full overflow-auto rounded-md border bg-background shadow-sm dark:bg-black'>
          {isLoading && <SuggestionsLoader />}
          {error && <SuggestionsError error={error} />}
          {!isLoading && !error && showSuggestions && (
            <SearchResults
              results={results}
              onClickSearchItem={handleClickSearchItem}
            />
          )}
        </div>
      )}
    </div>
  )
}

interface SearchResultsProps {
  results: PlaceInfo[]
  onClickSearchItem: (placeInfo: PlaceInfo) => void
}

function SearchResults ({ results, onClickSearchItem }: SearchResultsProps) {
  if (!results.length)
    return (
      <div className='grid min-h-40 place-content-center'>
        <p className='text-sm'>No hay resultados para la búsqueda</p>
      </div>
    )

  return (
    <ul className='py-1 text-sm text-foreground'>
      {results.map(result => (
        <li
          key={result.place_id}
          className='cursor-pointer px-4 py-2 hover:bg-gray-200 hover:opacity-85 dark:bg-gray-800'
          onClick={() => onClickSearchItem(result)}
        >
          {result.display_name}
        </li>
      ))}
    </ul>
  )
}

function SuggestionsLoader () {
  return (
    <div className='grid min-h-40 place-content-center'>
      <Spinner />
    </div>
  )
}

interface SuggestionsErrorProps {
  error: string
}

function SuggestionsError ({ error }: SuggestionsErrorProps) {
  return (
    <div className='grid min-h-40 place-content-center'>
      <p className='text-sm text-red-400 dark:text-red-600'>{error}</p>
    </div>
  )
}
