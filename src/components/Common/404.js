import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-2xl font-semibold mb-4">Page Not Found</p>
        <p className="text-gray-600 mb-4">The requested page does not exist.</p>
        <Link
          to="/"
          className="m-10 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none"
        >
          Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
