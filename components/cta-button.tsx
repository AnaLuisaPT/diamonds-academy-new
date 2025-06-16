import type React from "react"
import Link from "next/link"

interface CTAButtonProps {
  href: string
  variant?: "primary" | "secondary"
  children: React.ReactNode
  className?: string
}

export default function CTAButton({ href, variant = "primary", children, className = "" }: CTAButtonProps) {
  const baseStyles = "inline-block px-8 py-4 rounded-full font-semibold text-center transition-all duration-300 transform hover:scale-105"

  const variantStyles = {
    primary: "gradient-bg text-white shadow-lg hover:shadow-xl",
    secondary: "bg-white text-gray-800 border-2 border-violet hover:bg-violet hover:text-white shadow-md hover:shadow-lg",
  }

  return (
    <Link href={href} className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </Link>
  )
}