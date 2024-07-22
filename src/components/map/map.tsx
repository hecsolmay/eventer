'use client'

import { Button } from '@nextui-org/button'
import { Map as MapType } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useRef, useState } from 'react'
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMapEvents
} from 'react-leaflet'

import SearchLocation from './search'

import { MapPin } from '@/components/icons'
import { Cords } from '@/types'

interface MapProps extends Partial<Cords> {
  changeMarkerPosition?: (latlng: { lat: number; lng: number }) => void
  location?: string
}

const DEFAULT_LAT = 20.965943004395623
const DEFAULT_LNG = -89.60612297058107
const DEFAULT_ZOOM = 25

const LocationMarker = ({
  onLocationSelect
}: {
  onLocationSelect: (latlng: { lat: number; lng: number }) => void
}) => {
  useMapEvents({
    click (event) {
      onLocationSelect(event.latlng)
    }
  })

  return null
}

export default function Map ({
  lat = DEFAULT_LAT,
  lng = DEFAULT_LNG,
  changeMarkerPosition,
  location
}: MapProps) {
  const mapRef = useRef<MapType | null>(null)
  const [locationInfo, setLocationInfo] = useState<string | null>(
    location ?? null
  )
  const divRef = useRef<HTMLDivElement | null>(null)

  const handleLocationSelect = (latlng: { lat: number; lng: number }) => {
    changeMarkerPosition?.(latlng)
    changeMapView(latlng)
  }

  const changeMapView = (latlng: { lat: number; lng: number }) => {
    const { lat, lng } = latlng

    mapRef.current?.setView(
      [lat, lng],
      mapRef.current?.getZoom() ?? DEFAULT_ZOOM
    )
    divRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleLocalizationClick = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { coords } = position

        changeMarkerPosition?.({ lat: coords.latitude, lng: coords.longitude })
        changeMapView({ lat: coords.latitude, lng: coords.longitude })
      },
      error => {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    )
  }

  return (
    <>
      <SearchLocation
        locationInfo={locationInfo}
        saveLocationInfo={setLocationInfo}
        onLocationSelect={handleLocationSelect}
      />
      <div ref={divRef} className='relative h-[500px] w-full'>
        <Button
          isIconOnly
          // eslint-disable-next-line tailwindcss/enforces-shorthand
          className='absolute right-2 top-2 z-[9999] h-8 w-8 min-w-8'
          color='warning'
          title='Ir a mi localización actual'
          type='button'
          onClick={handleLocalizationClick}
        >
          <MapPin className='size-6' />
        </Button>
        <MapContainer
          ref={mapRef}
          center={[lat, lng]}
          style={{ width: '100%', height: '500px' }}
          zoom={DEFAULT_ZOOM}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
          <CircleMarker
            center={[lat, lng]}
            color='red'
            fillColor='red'
            fillOpacity={1}
            radius={10}
            weight={2}
          >
            <Popup>
              {locationInfo !== null
                ? locationInfo
                : `La ubicación actual es ${lat}, ${lng}`}
            </Popup>
          </CircleMarker>
          <LocationMarker onLocationSelect={handleLocationSelect} />
        </MapContainer>
      </div>
    </>
  )
}
