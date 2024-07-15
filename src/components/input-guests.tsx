'use client'

import { Input } from '@nextui-org/input'
import { Chip } from '@nextui-org/react'
import { Dispatch, SetStateAction, useState } from 'react'

interface InputGuestsProps {
  guests: string[]
  setGuests: Dispatch<SetStateAction<string[]>>
}

export default function InputGuests ({ guests, setGuests} : InputGuestsProps) {
  const [value, setValue] = useState('')

  const createHandleClose = (index: number) => () => {
    setGuests(prev => prev.filter((_, i) => i !== index))
  }

  const createHandleClick = (index: number) => () => {
    const guest = guests[index]

    setGuests(prev => prev.filter((_, i) => i !== index))
    setValue(guest)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value

    const isSeparator = inputValue.includes(',')

    if (isSeparator) {
      const [newGest] = event.target.value.split(',')

      setGuests(prev => [...prev, newGest])
      setValue('')

      return
    }

    setValue(event.target.value)
  }

  return (
    <Input
      classNames={{
        inputWrapper: 'h-auto',
        label: 'top-4',
        input: 'mt-1',
        innerWrapper: 'flex-wrap gap-1 pt-5'
      }}
      label='Invitados'
      placeholder='Coloca una coma para separar los invitados'
      startContent={
        <>
          {guests.map((guest, index) => (
            <Chip
              key={`${guest}-${index}`}
              size='sm'
              onClick={createHandleClick(index)}
              onClose={createHandleClose(index)}
            >
              {guest}
            </Chip>
          ))}
        </>
      }
      value={value}
      variant='bordered'
      onChange={handleInputChange}
    />
  )
}
