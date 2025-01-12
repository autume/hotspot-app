import { Hotspot } from '@helium/http'
import { Feature } from 'geojson'
import { NetworkHotspot } from '../store/networkHotspots/networkHotspotsSlice'

export const hotspotsToFeatures = (
  hotspots: (NetworkHotspot | Hotspot)[],
): Feature[] =>
  hotspots
    .filter((h) => h.lat && h.lng)
    .map(
      (h) =>
        ({
          type: 'Feature',
          properties: { ...h },
          geometry: { type: 'Point', coordinates: [h.lng, h.lat] },
          id: h.address,
        } as Feature),
    )

export type MapBounds = {
  ne: number[]
  sw: number[]
  paddingLeft?: number
  paddingRight?: number
  paddingTop?: number
  paddingBottom?: number
}

export const findBounds = (coords: number[][]): MapBounds | undefined => {
  if (coords.length === 0) {
    return
  }

  let minLng = coords[0][0]
  let maxLng = coords[0][0]
  let minLat = coords[0][1]
  let maxLat = coords[0][1]

  coords.forEach((m) => {
    const [lng, lat] = m
    if (lng < minLng) minLng = lng
    if (lng > maxLng) maxLng = lng
    if (lat < minLat) minLat = lat
    if (lat > maxLat) maxLat = lat
  })

  return {
    ne: [maxLng, maxLat],
    sw: [minLng, minLat],
    paddingBottom: 250,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 30,
  }
}
