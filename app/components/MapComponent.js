'use client'

import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default function MapComponent({ isDarkMode, onLocationSelect, mapClickedLocation }) {
  const mapRef = useRef(null)
  const mapInstanceRef = useRef(null)
  const markerRef = useRef(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    // Harita oluştur - Marmara ve Karadeniz bölgesi
    const map = L.map(mapRef.current).setView([41.0, 29.0], 7)
    mapInstanceRef.current = map

    // Tile layer ekle
    const tileUrl = isDarkMode
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

    L.tileLayer(tileUrl, {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(map)

    // Tıklama event'i
    map.on('click', (e) => {
      const { lat, lng } = e.latlng

      // Marker varsa kaldır
      if (markerRef.current) {
        map.removeLayer(markerRef.current)
      }

      // Yeni marker ekle
      const customIcon = L.divIcon({
        className: 'custom-marker',
        html: `<div style="
          background: #1E40AF;
          width: 30px;
          height: 30px;
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          border: 3px solid white;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
        "></div>`,
        iconSize: [30, 30],
        iconAnchor: [15, 30]
      })

      markerRef.current = L.marker([lat, lng], { icon: customIcon }).addTo(map)

      // Callback çağır
      if (onLocationSelect) {
        onLocationSelect(lat, lng)
      }
    })

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  // Dark mode değiştiğinde tile'ı güncelle
  useEffect(() => {
    if (!mapInstanceRef.current) return

    mapInstanceRef.current.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        mapInstanceRef.current.removeLayer(layer)
      }
    })

    const tileUrl = isDarkMode
      ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
      : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

    L.tileLayer(tileUrl, {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18
    }).addTo(mapInstanceRef.current)
  }, [isDarkMode])

  // mapClickedLocation değiştiğinde marker güncelle
  useEffect(() => {
    if (!mapInstanceRef.current || !mapClickedLocation) return

    if (markerRef.current) {
      mapInstanceRef.current.removeLayer(markerRef.current)
    }

    const customIcon = L.divIcon({
      className: 'custom-marker',
      html: `<div style="
        background: #1E40AF;
        width: 30px;
        height: 30px;
        border-radius: 50% 50% 50% 0;
        transform: rotate(-45deg);
        border: 3px solid white;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      "></div>`,
      iconSize: [30, 30],
      iconAnchor: [15, 30]
    })

    markerRef.current = L.marker([mapClickedLocation.lat, mapClickedLocation.lon], { icon: customIcon })
      .addTo(mapInstanceRef.current)

  }, [mapClickedLocation])

  return (
    <div
      ref={mapRef}
      style={{
        width: '100%',
        height: '100%',
        minHeight: '300px'
      }}
    />
  )
}
