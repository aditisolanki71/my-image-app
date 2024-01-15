import React, { useState, useEffect } from 'react'
import useDebounce from '../hooks/useDebounce'
import {
  fetchAllImages,
  fetchRandomBackground,
  fetchSearchPhotos
} from '../api/api'
import ImageHeader from '../components/ImageHeader'
import ImageItem from '../components/ImageItem'
import useInfiniteScroll from '../hooks/useInfinitescroll'
import Loader from '../components/Common/Loader'
import ErrorMessage from '../components/Common/ErrorMessage'

const Home = () => {
  const [images, setImages] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const { page, setPage } = useInfiniteScroll(1)
  const [randomBackground, setRandomBackground] = useState(null)
  const [starredImages, setStarredImages] = useState([])
  const debouncedSearchTerm = useDebounce(searchQuery)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRandom = async () => {
      try {
        const response = await fetchRandomBackground()
        setRandomBackground(response)
      } catch (error) {
        console.log('err', error)
        setError(
          'Rate Limit Exceeded fetching Background image. Please try again later.'
        )
      }
    }
    const fetchStarredImages = async () => {
      try {
        const storedStarredImages =
          JSON.parse(localStorage.getItem('starredImages')) || []
        setStarredImages(storedStarredImages)
      } catch (error) {
        setError(
          'Rate Limit Exceeded fetching starred Images. Please try again later.'
        )
      }
    }
    fetchRandom()
    fetchStarredImages()
  }, [])

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetchAllImages(searchQuery, page)
        if (page === 1) {
          setImages(response?.data)
        } else {
          setImages((prevImages) => [...prevImages, ...response?.data]) // Check the structure of the response
        }
      } catch (error) {
        console.error(
          'Rate Limit Exceeded fetching Images. Please try again later.',
          error
        )
      }
    }

    fetchImages()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page])

  useEffect(() => {
    const fetchSearchedImages = async (query) => {
      try {
        const response = await fetchSearchPhotos(query ?? searchQuery, page)
        setImages((prevImages) => [...prevImages, ...response?.data?.results])
      } catch (error) {
        setError('Error fetching searched images', error)
      }
    }
    const handleSearch = async (query) => {
      // Reset page to 1 when a new search is initiated
      setPage(1)
      setImages([])
      // Fetch images based on the search query
      if (debouncedSearchTerm.trim() === '') {
        // If the search query is empty, fetch all images
        try {
          const response = await fetchAllImages(query, 1)
          if (page === 1) {
            setImages(response?.data)
          } else {
            setImages((prevImages) => [...prevImages, ...response?.data])
          }
        } catch (error) {
          console.error('Error fetching images:', error)
        }
      } else {
        // If there is a search query, fetch images based on the query
        fetchSearchedImages(debouncedSearchTerm)
      }
    }
    handleSearch(debouncedSearchTerm)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm])

  const toggleStar = (imageId) => {
    const selectedImage = images.find((image) => image.id === imageId)
    // Check if the image is already starred
    const isStarred = starredImages?.some(
      (starredImage) => starredImage.id === imageId
    )
    if (isStarred) {
      // If already starred, remove from the starred images
      const updatedStarred = starredImages.filter(
        (starredImage) => starredImage.id !== imageId
      )
      setStarredImages(updatedStarred)
      localStorage.setItem('starredImages', JSON.stringify(updatedStarred))
    } else {
      // If not starred, add to the existing starred images
      const updatedStarred = [...starredImages, selectedImage]
      setStarredImages(updatedStarred)
      localStorage.setItem('starredImages', JSON.stringify(updatedStarred))
    }
  }

  return (
    <div
      className="relative min-h-screen bg-cover"
      style={{ backgroundImage: `url(${randomBackground})` }}
    >
      <div className="container mx-auto p-4">
        <ImageHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
        {error && <ErrorMessage message={error} />}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {images?.map((image) => (
            <ImageItem
              key={image.id}
              image={image}
              starredImages={starredImages}
              // toggleStar={toggleStar}
              toggleStar={() => toggleStar(image.id, images)}
            />
          ))}
        </div>
        {images.length > 0 && <Loader />}
      </div>
    </div>
  )
}

export default Home
