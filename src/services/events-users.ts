import prisma from '@/utils/prisma'

export class EventsUsersService {
  static async createEventUser (eventId: string, userId: string) {
    await prisma.userEvents.create({
      data: {
        eventId,
        userId
      }
    })
  }

  static async deleteEventUser (eventId: string, userId: string) {
    await prisma.userEvents.deleteMany({
      where: {
        eventId,
        userId
      }
    })
  }

  static async isEventUserRegistered (eventId: string, userId: string) {
    const eventUser = await prisma.userEvents.findFirst({
      where: {
        eventId,
        userId
      }
    })

    return eventUser !== null
  }

  static async getEventUsers (eventId: string) {
    const eventUsers = await prisma.userEvents.findMany({
      include: {
        users: true
      },
      where: {
        eventId
      }
    })

    return eventUsers.map(eventUser => eventUser.users)
  }
}
