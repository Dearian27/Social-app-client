import { useState, useEffect, useCallback } from 'react'
import axios from '../utils/axios'
import PostItem from '../components/PostItem'

const PostsPage = (props) => {
  const [posts, setPosts] = useState([]);
  const fetchMyPosts = useCallback(async () => {
    try {
      const { data } = await axios.get('/posts/user/me');
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  }, [])

  useEffect(() => {
    fetchMyPosts()
  }, [fetchMyPosts, posts])



  if (!posts) {
    return <div className='text-xl text-center text-white py-10'>Loading...</div>
  }
  return (
    <div className='w-1/2 mx-auto py-10 flex flex-col gap-10'>
      {posts?.map((post, idx) => {
        if (post)
          return <PostItem post={post} key={idx} />
      })}
    </div>
  )
}

export default PostsPage