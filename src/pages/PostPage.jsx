import React, { useEffect, useState } from 'react';
import { AiFillEye, AiOutlineMessage, AiTwotoneEdit, AiTwotoneDelete } from 'react-icons/ai';
import Moment from 'react-moment';
import axios from '../utils/axios';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deletePost } from '../redux/features/post/postSlice';
import { toast } from 'react-toastify';
import { createComment, getPostComments } from '../redux/features/comment/commentSlice';
import CommentItem from '../components/CommentItem';

const PostPage = (props) => {

  const dispatch = useDispatch()
  const navigate = useNavigate();
  const params = useParams();

  const [comment, setComment] = useState('')
  const { user } = useSelector(state => state.auth)
  const { comments } = useSelector((state) => state.comment)
  const [post, setPost] = useState(null)

  const fetchPost = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`)
    setPost(data)
  }, [params])

  const fetchComments = useCallback(async () => {
    try {
      dispatch(getPostComments(params.id))
    } catch (error) {
      console.log("get comments", error)
    }
  }, [dispatch, params.id])

  useEffect(() => {
    fetchPost()
  }, [fetchPost]);

  useEffect(() => {
    fetchComments()
  }, [fetchComments]);

  if (!post) {
    return <div className='text-xl text-center text-white py-10'>Loading...</div>
  }

  const deletePostHandler = async () => {
    try {
      dispatch(deletePost(params.id))
      toast("Post has been deleted")
      navigate('/posts')
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async () => {
    try {
      const postId = params.id
      if (comment) {
        dispatch(createComment({ postId, comment }))
        setComment('')
      }
      else {
        toast("Comment cannot be empty")
      }
    } catch (error) {
      console.log("create comment", error)
    }

  }



  return (
    <div>
      <Link to='/'>
        <button className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
          Back
        </button>
      </Link>
      <div className='flex gap-10 py-8'>
        <div className='w-2/3'>
          {/* <div className='flex flex-col basis-1/4 flex-grow'>
            <div className="">IMAGE</div>
          </div> */}
          {/*--------------POST-----------------*/}
          <div className='flex flex-col basis-1/4 flex-grow'>
            <div className={post.imgUrl ? 'flex rounded-sm h-80' : 'flex rounded-sm'}>
              {post.imgUrl && (
                <img src={`http://localhost:3002/${post.imgUrl}`} alt="" className='object-cover w-full' />
              )}
            </div>
            <div className='flex justify-between items-center pt-2'>
              <div className='text-xs text-white opacity-50'>{post.username}</div>
              <div className='text-xs text-white opacity-50'>
                <Moment date={post.createdAt} format='D MMM YYYY' />
              </div>
            </div>
            <div className='text-white text-xl'>{post.title}</div>
            <p className='text-white opacity-60 text-xs pt-4'>{post.text}</p>

            <div className="flex items-center gap-3 mt-2 justify-between">
              <div className='flex gap-3 mt-4'>
                <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                  <AiFillEye /> <span>{post.views || 0}</span>
                </button>
                <button className='flex items-center justify-center gap-2 text-xs text-white opacity-50'>
                  <AiOutlineMessage /> <span>{post.comments?.length || 0}</span>
                </button>
              </div>
              {user?._id === post.author &&
                <div className='flex gap-3 mt-4'>
                  <Link to={`/${params.id}/edit`}>
                    <button className='flex items-center justify-center gap-2 text-white opacity-50'>
                      <AiTwotoneEdit />
                    </button>
                  </Link>
                  <button onClick={deletePostHandler} className='flex items-center justify-center gap-2 text-white opacity-50'>
                    <AiTwotoneDelete />
                  </button>
                </div>
              }
            </div>

          </div>
          {/*--------------POST-----------------*/}
        </div>
        <div className='w-1/3 text-white p-8 bg-gray-700 flex-col gap-2 rounded-sm' >
          <form className='flex gap-2' onSubmit={e => e.preventDefault()}>
            <input value={comment} onChange={event => setComment(event.target.value)} type="text" placeholder='Comment'
              className='text-black w-full rounded-sm bg-gray-400 border p-2 text-xs outline-none placeholder:text-gray-700'
            />
            <button type='submit' onClick={handleSubmit}
              className='justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
              Send
            </button>
          </form>
          {
            // typeof comments === Object &&
            comments?.map?.(comment => {
              return <CommentItem key={comment._id} comment={comment} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default PostPage