"use client"

import { useEffect, useRef } from "react"
import { google } from "google-maps"

interface GoogleMapProps {
  address?: string
  latitude?: number
  longitude?: number
  zoom?: number
  height?: string
  className?: string
  apiKey?: string
}

export default function GoogleMap({
  address = "Diamond's Academy, Santiago, Chile",
  latitude = -33.4489,
  longitude = -70.6693,
  zoom = 15,
  height = "400px",
  className = "",
  apiKey,
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)

  useEffect(() => {
    const loadGoogleMaps = async () => {
      if (typeof window !== "undefined" && mapRef.current && !mapInstanceRef.current) {
        // Si no hay API key, mostrar mensaje
        if (!apiKey) {
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
                padding: 20px;
              ">
                <div style="
                  background: linear-gradient(135deg, #40e0d0 0%, #8a2be2 100%);
                  width: 60px;
                  height: 60px;
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  margin-bottom: 16px;
                ">
                  <div style="color: white; font-size: 24px;">📍</div>
                </div>
                <h3 style="margin: 0 0 8px 0; color: #8a2be2; font-size: 18px;">Diamond's Academy</h3>
                <p style="margin: 0 0 16px 0; color: #666; font-size: 14px;">${address}</p>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}" 
                  target="_blank"
                  style="
                    background: linear-gradient(135deg, #40e0d0 0%, #8a2be2 100%);
                    color: white;
                    padding: 10px 20px;
                    border-radius: 25px;
                    text-decoration: none;
                    font-weight: 500;
                    transition: transform 0.2s;
                  "
                  onmouseover="this.style.transform='scale(1.05)'"
                  onmouseout="this.style.transform='scale(1)'"
                >
                  Ver en Google Maps
                </a>
              </div>
            `
          }
          return
        }

        // Cargar Google Maps con API key
        const script = document.createElement("script")
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap`
        script.async = true

        window.initMap = () => {
          const map = new google.maps.Map(mapRef.current!, {
            center: { lat: latitude, lng: longitude },
            zoom: zoom,
            styles: [
              {
                featureType: "poi",
                elementType: "labels",
                stylers: [{ visibility: "off" }],
              },
            ],
          })

          const marker = new google.maps.Marker({
            position: { lat: latitude, lng: longitude },
            map: map,
            title: "Diamond's Academy",
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#8a2be2",
              fillOpacity: 1,
              strokeColor: "#40e0d0",
              strokeWeight: 3,
            },
          })

          const infoWindow = new google.maps.InfoWindow({
            content: `
              <div style="text-align: center; padding: 10px;">
                <h3 style="margin: 0 0 8px 0; color: #8a2be2;">Diamond's Academy</h3>
                <p style="margin: 0; color: #666;">${address}</p>
              </div>
            `,
          })

          marker.addListener("click", () => {
            infoWindow.open(map, marker)
          })

          mapInstanceRef.current = map
        }

        document.head.appendChild(script)
      }
    }

    loadGoogleMaps()
  }, [latitude, longitude, zoom, address, apiKey])

  return (
    <div className={`relative rounded-lg overflow-hidden shadow-lg ${className}`}>
      <div ref={mapRef} style={{ height }} className="w-full bg-gray-200" />
    </div>
  )
}
