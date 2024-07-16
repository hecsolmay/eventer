import { NextRequest, NextResponse } from 'next/server'

const PLACE_API_URL =
  'https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1'

const getPlaceApiUrl = (lat: string, lng: string) => {
  return `${PLACE_API_URL}&lat=${lat}&lon=${lng}`
}

export async function GET (request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')

  if (!lat || !lng) {
    return NextResponse.json(
      {
        error: 'lat or lng is not provided'
      },
      { status: 400 }
    )
  }

  try {
    const response = await fetch(getPlaceApiUrl(lat, lng))
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
