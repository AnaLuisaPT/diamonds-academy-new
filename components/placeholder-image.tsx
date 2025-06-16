import Image from "next/image"

interface PlaceholderImageProps {
  width: number
  height: number
  text?: string
  className?: string
  fill?: boolean
  sizes?: string
}

export default function PlaceholderImage({
  width,
  height,
  text,
  className = "",
  fill = false,
  sizes,
}: PlaceholderImageProps) {
  const placeholderUrl = `https://via.placeholder.com/${width}x${height}/E5E7EB/6B7280?text=${encodeURIComponent(text || `${width}x${height}`)}`

  if (fill) {
    return (
      <Image
        src={placeholderUrl || "/placeholder.svg"}
        alt={text || "Placeholder"}
        fill
        className={className}
        sizes={sizes}
      />
    )
  }

  return (
    <Image
      src={placeholderUrl || "/placeholder.svg"}
      alt={text || "Placeholder"}
      width={width}
      height={height}
      className={className}
    />
  )
}
