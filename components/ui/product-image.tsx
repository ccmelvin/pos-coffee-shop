'use client'

import { useState } from 'react'
import { Coffee } from 'lucide-react'

interface ProductImageProps {
  src?: string
  alt: string
  className?: string
}

export function ProductImage({ src, alt, className = "" }: ProductImageProps) {
  const [imageError, setImageError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const handleImageError = () => {
    setImageError(true)
    setIsLoading(false)
  }

  const handleImageLoad = () => {
    setIsLoading(false)
  }

  if (!src || imageError) {
    return (
      <div className={`bg-gradient-to-br from-emerald-50 to-emerald-100 flex items-center justify-center ${className}`}>
        <div className="text-center">
          <Coffee className="h-8 w-8 lg:h-12 lg:w-12 text-emerald-400 mx-auto mb-2" />
          <span className="text-xs text-emerald-600 font-medium">No Image</span>
        </div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-100 animate-pulse flex items-center justify-center">
          <Coffee className="h-6 w-6 text-gray-400 animate-pulse" />
        </div>
      )}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover hover:scale-105 transition-transform duration-200 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        onError={handleImageError}
        onLoad={handleImageLoad}
      />
      <div className="absolute inset-0 bg-black/5 hover:bg-black/0 transition-colors duration-200" />
    </div>
  )
}
