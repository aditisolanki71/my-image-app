import { useState, useEffect } from 'react'

const useInfiniteScroll = (initialPage, fetchMoreData) => {
  const [page, setPage] = useState(initialPage)

  useEffect(() => {
    const fetchMoreData = () => {
      setPage(page + 1)
    }
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        fetchMoreData()
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [fetchMoreData, page])

  return { page, setPage }
}

export default useInfiniteScroll
