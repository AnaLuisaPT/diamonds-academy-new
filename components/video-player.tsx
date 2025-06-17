"use client"

import { useState, useRef } from "react"
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react"

interface VideoPlayerProps {
  src: string
  poster?: string
  title: string
  className?: string
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
}

export default function VideoPlayer({
  src,
  poster,
  title,
  className = "",
  autoplay = true, // Por defecto autoplay activado
  muted = true, // Por defecto muted para que funcione autoplay
  loop = true, // Por defecto loop activado
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const [isMuted, setIsMuted] = useState(muted)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen()
      }
    }
  }

  return (
    <div
      className={`relative group bg-black rounded-lg overflow-hidden ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={poster}
        preload="metadata"
        autoPlay={autoplay} // Autoplay activado
        muted={muted} // Muted para que funcione autoplay
        loop={loop} // Loop para repetir
        playsInline // Para móviles iOS
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onLoadedMetadata={() => {
          // Asegurar que el video esté muted al cargar
          if (videoRef.current) {
            videoRef.current.muted = isMuted
          }
        }}
      >
        <source src={src} type="video/mp4" />
        Tu navegador no soporta el elemento video.
      </video>

      {/* Overlay de controles - solo aparece cuando está pausado o en hover */}
      {(!isPlaying || showControls) && (
        <div className="absolute inset-0 bg-black/20 transition-opacity duration-300">
          {/* Botón de play grande cuando está pausado */}
          {!isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={togglePlay}>
              <div className="bg-white/90 rounded-full p-6 group-hover:scale-110 transition-transform">
                <Play className="w-12 h-12 text-gray-800 ml-1" />
              </div>
            </div>
          )}

          {/* Controles en la parte inferior */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold text-sm md:text-base">{title}</h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className="text-white hover:text-turquoise transition-colors p-1"
                  title={isPlaying ? "Pausar" : "Reproducir"}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleMute}
                  className="text-white hover:text-turquoise transition-colors p-1"
                  title={isMuted ? "Activar sonido" : "Silenciar"}
                >
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <button
                  onClick={toggleFullscreen}
                  className="text-white hover:text-turquoise transition-colors p-1"
                  title="Pantalla completa"
                >
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Indicador de que está en mute */}
      {isMuted && isPlaying && (
        <div className="absolute top-4 right-4 bg-black/60 rounded-full p-2">
          <VolumeX className="w-4 h-4 text-white" />
        </div>
      )}
    </div>
  )
}
