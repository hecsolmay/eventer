import { APP_URL } from '@/config'
import {
  PlaceInfo,
  PlaceInfoResponse,
  SearchPlacesInfoResponse
} from '@/types/places'

export class PlaceInfoService {
  static async getPlaceInfo ({
    lat,
    lng
  }: {
    lat: number
    lng: number
  }): Promise<PlaceInfo> {
    const placeInfo = await fetch(`${APP_URL}/api/places?lat=${lat}&lng=${lng}`)

    const data = (await placeInfo.json()) as PlaceInfoResponse

    if ('error' in data) {
      return {
        class: 'Unavailable',
        display_name: 'Unavailable',
        lat: lat.toString(),
        lon: lng.toString(),
        name: 'Unavailable',
        place_id: -1
      }
    }

    return data
  }

  static async searchPlacesInfo (query: string): Promise<PlaceInfo[]> {
    const placeInfo = await fetch(`${APP_URL}/api/places/search?q=${query}`)
    const data = (await placeInfo.json()) as SearchPlacesInfoResponse

    if ('error' in data) {
      return []
    }

    return data
  }
}
