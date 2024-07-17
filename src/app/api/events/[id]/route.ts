import { NextResponse, type NextRequest } from 'next/server'

import { EventsService } from '@/services/events'
import { ApiServerContext } from '@/types'
import { handleResponseError } from '@/utils/errors'

export async function GET (request: NextRequest, context: ApiServerContext) {
  const { id } = context.params

  try {
    const event = await EventsService.getEvent(id)

    if (event === null) {
      return NextResponse.json(
        {
          success: false,
          code: 404,
          message: 'Event not found'
        },
        {
          status: 404
        }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Event found successfully',
      data: event
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)

    return handleResponseError(error)
  }
}
