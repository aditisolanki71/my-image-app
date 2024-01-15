import { Link } from 'react-router-dom'
import StarIcon from './Icon/StarIcon'
const ImageHeader = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-4 flex items-center">
      <input
        type="text"
        className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:border-blue-500"
        placeholder="Search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Link
        to="/starred"
        className="ml-4 p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 focus:outline-none"
      >
        <StarIcon />
      </Link>
    </div>
  )
}
export default ImageHeader
