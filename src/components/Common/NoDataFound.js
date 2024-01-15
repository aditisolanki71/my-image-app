import React from 'react'

const NoDataFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-800">No Data Found</h1>
        <p className="text-2xl font-semibold mb-4">
          Sorry, there is no data available.
        </p>
      </div>
    </div>
  )
}

export default NoDataFound
