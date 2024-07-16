export interface PlaceInfo {
  place_id: number
  lat: string
  lon: string
  class: string
  name: string
  display_name: string
}

export interface PlaceInfoErro {
  error:
    | string
    | {
        code: number
        message: string
      }
}

export type PlaceInfoResponse = PlaceInfo | PlaceInfoErro