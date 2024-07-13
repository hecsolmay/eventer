/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client'

async function main () {
  const prisma = new PrismaClient()

  await prisma.events.deleteMany()

  const createdEvent = await prisma.events.create({
    data: {
      name: 'Event Name',
      description: 'Event Description',
      guests: ['Guest 1', 'Guest 2'],
      eventDate: new Date('2024-07-13'), // Asegúrate de pasar una fecha en formato ISO
      eventTime: '6:00 PM', // Asegúrate de pasar una hora en formato ISO
      isFree: true,
      lat: 0,
      lng: 0,
      state: 'ACTIVE',
      createdAt: new Date()
    }
  })

  console.log(createdEvent)
}

main().catch(e => {
  console.error(e)
  process.exit(1)
})
