import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import ImageItem from '../components/ImageItem'
import Loader from '../components/Common/Loader'
import NoDataFound from '../components/Common/NoDataFound'

const Starred = () => {
  const [starredImages, setStarredImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Fetch starred images from local storage on component mount
  useEffect(() => {
    const fetchStarredImages = async () => {
      try {
        const storedStarredImages =
          JSON.parse(localStorage.getItem('starredImages')) || []
        setStarredImages(storedStarredImages)
      } catch (error) {
        console.error('Error fetching starred images:', error)
      } finally {
        setIsLoading(false) // Set loading to false once the images are fetched
      }
    }

    fetchStarredImages()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <div
        className="d-flex"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <div className="mb-4">
          <h2 className="text-2xl font-bold">My Favourite Images</h2>
        </div>
        <div>
          <Link
            to="/"
            className="ml-4 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none"
          >
            Home
          </Link>
        </div>
      </div>
      {isLoading ? (
        <Loader />
      ) : starredImages.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {starredImages.map((image) => (
            <ImageItem
              key={image.id}
              image={image}
              starredImages={starredImages}
              // toggleStar={toggleStar}
              isStarred
            />
          ))}
        </div>
      ) : (
        <NoDataFound />
      )}
    </div>
  )
}

export default Starred
