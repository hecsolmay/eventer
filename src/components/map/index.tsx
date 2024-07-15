import dynamic from 'next/dynamic'

export const LeafletMap = dynamic(() => import('./map'), { ssr: false })