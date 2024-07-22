import { NextRequest, NextResponse } from 'next/server'

const PLACE_API_URL = 'https://nominatim.openstreetmap.org/search?format=json'

const getPlaceApiUrl = (query: string) => {
  return `${PLACE_API_URL}&q=${encodeURIComponent(query)}`
}

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json(
      {
        error: 'query is not provided'
      },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(getPlaceApiUrl(query))
    const data = await response.json()

    return NextResponse.json(data)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)

    return NextResponse.json(
      {
        error: 'Something went wrong'
      },
      { status: 500 }
    )
  }
}
