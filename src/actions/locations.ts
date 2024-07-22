'use server'

import { PlaceInfoService } from '@/services/place-info'

export async function searchLocations (query: string) {
  try {
    const result = await PlaceInfoService.searchPlacesInfo(query)

    return result
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)

    return []
  }
}
