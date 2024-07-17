import { type NextRequest, NextResponse } from 'next/server'

import { URLSearchParamsToSearchParams } from '@/utils/search-params'
import { EventsService } from '@/services/events'
import { searchParamsToEventsFilter } from '@/utils/filters/events'

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const parsedSearchParams = URLSearchParamsToSearchParams(searchParams)
  const params = searchParamsToEventsFilter(parsedSearchParams)

  try {
    const { events, info } = await EventsService.getEvents(params)

    return NextResponse.json({
      success: true,
      message: 'Ok',
      info,
      data: events
    })
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)

    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
        code: 500
      },
      {
        status: 500
      }
    )
  }
}
