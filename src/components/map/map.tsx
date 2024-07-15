'use client'

import { Button } from '@nextui-org/button'
import { Map as MapType } from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useRef } from 'react'
import {
  CircleMarker,
  MapContainer,
  Popup,
  TileLayer,
  useMapEvents
} from 'react-leaflet'

import { MapPin } from '@/components/icons'
import { Cords } from '@/types'

interface MapProps extends Partial<Cords> {
  changeMarkerPosition?: (latlng: { lat: number; lng: number }) => void
}

const DEFAULT_LAT = 20.965943004395623
const DEFAULT_LNG = -89.60612297058107
const DEFAULT_ZOOM = 20

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
  changeMarkerPosition
}: MapProps) {
  const mapRef = useRef<MapType | null>(null)

  const handleLocationSelect = (latlng: { lat: number; lng: number }) => {
    changeMarkerPosition?.(latlng)
  }

  const handleLocalizationClick = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { coords } = position

        changeMarkerPosition?.({ lat: coords.latitude, lng: coords.longitude })
        mapRef.current?.setView(
          [coords.latitude, coords.longitude],
          mapRef.current?.getZoom() ?? DEFAULT_ZOOM
        )
      },
      error => {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    )
  }

  return (
    <div className='relative h-[500px] w-full'>
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
            La ubicación actual es {lat}, {lng}
          </Popup>
        </CircleMarker>
        <LocationMarker onLocationSelect={handleLocationSelect} />
      </MapContainer>
    </div>
  )
}
