import React, { useEffect, useState } from 'react'
import StarIcon from './Icon/StarIcon'

const ImageItem = ({ image, starredImages, toggleStar, isStarred }) => {
  const [starAnimation, setStarAnimation] = useState(false)

  useEffect(() => {
    if (starAnimation) {
      const timeoutId = setTimeout(() => {
        setStarAnimation(false)
      }, 300) // Adjust the duration based on your transition duration

      return () => clearTimeout(timeoutId)
    }
  }, [starAnimation])

  const handleStarClick = () => {
    toggleStar(image.id)
    setStarAnimation(true)
  }

  return (
    <div
      key={image.id}
      className="overflow-hidden rounded-lg border border-gray-300 relative transition-transform duration-300 transform hover:scale-105"
    >
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className="w-full h-40 object-cover"
        loading="lazy"
      />
      {!isStarred ? (
        <button
          className={`absolute top-2 right-2 top-2 right-2 p-2 text-white rounded ${
            starredImages.some(
              (starredImage) => starredImage.id === image.id
            ) && 'bg-yellow-800'
          } ${starAnimation ? 'animate-star' : ''}`}
          onClick={handleStarClick}
          title={
            starredImages.some((starredImage) => starredImage.id === image.id)
              ? 'Mark as Unfavourite'
              : 'Mark as Favourite'
          }
        >
          {/* {starredImages.some((starredImage) => starredImage.id === image.id) ? "Starred" : "Star"} */}
          <StarIcon />
        </button>
      ) : null}
    </div>
  )
}
export default ImageItem
