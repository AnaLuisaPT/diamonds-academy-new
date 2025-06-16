"use client"

import Image from "next/image"
import { useState } from "react"
import PlaceholderImage from "./placeholder-image"

interface SmartImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
  sizes?: string
  priority?: boolean
  placeholderText?: string
}

export default function SmartImage({
  src,
  alt,
  width = 400,
  height = 300,
  fill = false,
  className = "",
  sizes,
  priority = false,
  placeholderText,
}: SmartImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  if (!src || imageError) {
    return (
      <PlaceholderImage
        width={width}
        height={height}
        text={placeholderText || alt}
        className={className}
        fill={fill}
        sizes={sizes}
      />
    )
  }

  return (
    <div className="relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-md flex items-center justify-center">
            <div className="text-gray-400 text-sm">Cargando...</div>
        </div>
      )}

      <Image
        src={src}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={`transition-opacity duration-500 ${isLoading ? "opacity-0" : "opacity-100"} ${className}`}
        sizes={sizes}
        priority={priority}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          console.error(`Error al cargar la imagen: ${src}`);
          setImageError(true)
          setIsLoading(false)
        }}
      />
    </div>
  )
}