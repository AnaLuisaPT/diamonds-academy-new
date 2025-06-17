import type React from "react"

interface SectionTitleProps {
  title: string
  subtitle: string
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle }) => {
  return (
    <div className="mb-8 text-center">
      <h2 className="text-3xl font-bold text-gray-900">{title}</h2>
      <p className="text-gray-600">{subtitle}</p>
    </div>
  )
}

export default SectionTitle

