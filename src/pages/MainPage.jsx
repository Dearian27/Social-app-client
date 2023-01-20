import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PopularPost from '../components/PopularPosts'
import PostItem from '../components/PostItem'
import { getAll } from '../redux/features/post/postSlice'

const MainPage = (props) => {
  const dispatch = useDispatch()
  const { posts, popularPosts } = useSelector(state => state.post)

  useEffect(() => {
    dispatch(getAll())
  }, [dispatch])

  if (posts.length === 0) {
    return <div className='text-xl text-center text-white py-10'>Loading...</div>
  }

  return (
    <div className='max-w-[900px] mx-auto py-10'>
      <div className="flex justify-between gap-8">
        <div className="flex flex-col gap-10 basis-4/5">
          {posts?.map((post, idx) => <PostItem key={idx} post={post} />)

          }
        </div>
        <div className="basis-1/5">
          <div className='text-xs uppercase text-white'>
            Popular:
          </div>
          {popularPosts?.map((post, idx) => (
            <PopularPost key={idx} post={post} />
          ))
          }
        </div>

      </div>
    </div>
  )
}

export default MainPage