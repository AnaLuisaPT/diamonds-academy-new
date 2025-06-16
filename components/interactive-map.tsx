"use client"

import { useEffect, useRef } from "react"
import "leaflet/dist/leaflet.css"

interface InteractiveMapProps {
  address?: string
  latitude?: number
  longitude?: number
  zoom?: number
  height?: string
  className?: string
}

export default function InteractiveMap({
  address = "Diamond's Academy, Santiago, Chile",
  latitude = -33.4489,
  longitude = -70.6693,
  zoom = 15,
  height = "400px",
  className = "",
}: InteractiveMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    const loadMap = async () => {
      if (typeof window !== "undefined" && mapRef.current && !mapInstanceRef.current) {
        try {
          // Importar Leaflet dinámicamente
          const L = (await import("leaflet")).default

          // Fix para los iconos por defecto de Leaflet
          delete (L.Icon.Default.prototype as any)._getIconUrl
          L.Icon.Default.mergeOptions({
            iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
            iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
          })

          // Crear el mapa
          const map = L.map(mapRef.current).setView([latitude, longitude], zoom)

          // Agregar tiles de OpenStreetMap
          L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }).addTo(map)

          // Crear un ícono personalizado para el marcador
          const customIcon = L.divIcon({
            html: `
              <div style="
                background: linear-gradient(135deg, #40e0d0 0%, #8a2be2 100%);
                width: 40px;
                height: 40px;
                border-radius: 50% 50% 50% 0;
                border: 4px solid white;
                box-shadow: 0 4px 15px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
                transform: rotate(-45deg);
                position: relative;
              ">
                <div style="
                  width: 12px;
                  height: 12px;
                  background: white;
                  border-radius: 50%;
                  transform: rotate(45deg);
                "></div>
              </div>
            `,
            className: "custom-marker",
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          })

          // Agregar marcador
          const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map)

          // Popup con información mejorada
          marker.bindPopup(
            `
            <div style="text-align: center; padding: 15px; min-width: 200px;">
              <div style="
                background: linear-gradient(135deg, #40e0d0 0%, #8a2be2 100%);
                color: white;
                padding: 8px 16px;
                border-radius: 20px;
                margin-bottom: 12px;
                font-weight: bold;
                font-size: 16px;
              ">
                💎 Diamond's Academy
              </div>
              <p style="margin: 8px 0; color: #666; font-size: 14px; line-height: 1.4;">
                ${address}
              </p>
              <div style="margin-top: 15px; display: flex; gap: 8px; justify-content: center;">
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}" 
                  target="_blank" 
                  style="
                    background: linear-gradient(135deg, #40e0d0 0%, #8a2be2 100%);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    text-decoration: none;
                    font-size: 12px;
                    font-weight: 500;
                    transition: transform 0.2s;
                  "
                  onmouseover="this.style.transform='scale(1.05)'"
                  onmouseout="this.style.transform='scale(1)'"
                >
                  📍 Ver en Google Maps
                </a>
                <a 
                  href="https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes" 
                  target="_blank" 
                  style="
                    background: #00d4ff;
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    text-decoration: none;
                    font-size: 12px;
                    font-weight: 500;
                    transition: transform 0.2s;
                  "
                  onmouseover="this.style.transform='scale(1.05)'"
                  onmouseout="this.style.transform='scale(1)'"
                >
                  🚗 Abrir en Waze
                </a>
              </div>
            </div>
          `,
            {
              maxWidth: 300,
              className: "custom-popup",
            },
          )

          mapInstanceRef.current = map

          // Abrir popup automáticamente después de un pequeño delay
          setTimeout(() => {
            marker.openPopup()
          }, 1000)

          // Agregar controles de zoom personalizados
          map.zoomControl.setPosition("bottomright")
        } catch (error) {
          console.error("Error loading map:", error)
          // Fallback en caso de error
          if (mapRef.current) {
            mapRef.current.innerHTML = `
              <div style="
                height: 100%;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, rgba(64, 224, 208, 0.1) 0%, rgba(138, 43, 226, 0.1) 100%);
                text-align: center;
                padding: 40px 20px;
                border-radius: 8px;
              ">
                <div style="
                  background: linear-gradient(135deg, #40e0d0 0%, #8a2be2 100%);
                  width: 80px;
                  height: 80px;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-bottom: 20px;
                  font-size: 32px;
                ">
                  📍
                </div>
                <h3 style="margin: 0 0 12px 0; color: #8a2be2; font-size: 24px; font-weight: bold;">
                  Diamond's Academy
                </h3>
                <p style="margin: 0 0 20px 0; color: #666; font-size: 16px; line-height: 1.5;">
                  ${address}
                </p>
                <div style="display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;">
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}" 
                    target="_blank"
                    style="
                      background: linear-gradient(135deg, #40e0d0 0%, #8a2be2 100%);
                      color: white;
                      padding: 12px 24px;
                      border-radius: 25px;
                      text-decoration: none;
                      font-weight: 600;
                      transition: transform 0.2s;
                      display: inline-block;
                    "
                    onmouseover="this.style.transform='scale(1.05)'"
                    onmouseout="this.style.transform='scale(1)'"
                  >
                    Ver en Google Maps
                  </a>
                  <a 
                    href="https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes" 
                    target="_blank"
                    style="
                      background: #00d4ff;
                      color: white;
                      padding: 12px 24px;
                      border-radius: 25px;
                      text-decoration: none;
                      font-weight: 600;
                      transition: transform 0.2s;
                      display: inline-block;
                    "
                    onmouseover="this.style.transform='scale(1.05)'"
                    onmouseout="this.style.transform='scale(1)'"
                  >
                    Abrir en Waze
                  </a>
                </div>
              </div>
            `
          }
        }
      }
    }

    loadMap()

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [latitude, longitude, zoom, address])

  return (
    <div className={`relative rounded-xl overflow-hidden shadow-2xl border border-gray-200 ${className}`}>
      <div
        ref={mapRef}
        style={{ height }}
        className="w-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
      >
        <div className="flex flex-col items-center text-gray-500">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet mb-2"></div>
          <div className="text-sm">Cargando mapa...</div>
        </div>
      </div>

      {/* Overlay con información adicional */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg max-w-xs border border-gray-200">
        <div className="flex items-center mb-2">
          <div className="w-3 h-3 bg-gradient-to-r from-turquoise to-violet rounded-full mr-2"></div>
          <h4 className="font-bold text-gray-800">Diamond's Academy</h4>
        </div>
        <p className="text-sm text-gray-600 leading-relaxed">{address}</p>
      </div>
    </div>
  )
}
