import React from 'react'

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-500 text-white p-4 my-4 rounded-md">{message}</div>
  )
}

export default ErrorMessage
