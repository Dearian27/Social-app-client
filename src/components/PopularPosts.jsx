import React from 'react'
import { Link } from 'react-router-dom'

const PopularPost = ({ post }) => {
  if (!post) {
    return <div className='text-xl text-center text-white py-10'>loading...</div>
  }
  return (
    <Link to={`/${post._id}`}>
      <div className='bg-gray-600 my-1 cursor-pointer'>
        <div className="flex text-xs p-2 text-gray-300  hover:bg-gray-800 hover:text-white">
          {post.title}
        </div>
      </div>
    </Link>
  )
}

export default PopularPost