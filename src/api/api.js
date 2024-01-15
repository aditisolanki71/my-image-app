import axios from 'axios'
import { BASE_URL, CLIENT_ID, PAGE_SIZE } from '../config/variable'

export const fetchRandomBackground = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/photos/random`, {
      params: {
        client_id: CLIENT_ID
      }
    })
    return response?.data?.urls?.full
  } catch (error) {
    const errorMessage = error.response.data || 'An error occurred'
    throw new Error(errorMessage)
  }
}

export const fetchAllImages = async (searchQuery, page) => {
  try {
    const response = await axios.get(`${BASE_URL}/photos`, {
      params: {
        client_id: CLIENT_ID,
        query: searchQuery,
        page: page,
        per_page: PAGE_SIZE
      }
    })
    return response
  } catch (error) {
    console.error('Error fetching random background image:', error)
    throw new Error(error)
  }
}

export const fetchSearchPhotos = async (searchQuery, page) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/photos`, {
      params: {
        client_id: CLIENT_ID,
        query: searchQuery,
        page: page,
        per_page: PAGE_SIZE
      }
    })
    return response
  } catch (error) {
    console.error('Error fetching random background image:', error)
  }
}
