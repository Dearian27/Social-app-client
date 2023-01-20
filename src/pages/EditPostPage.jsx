import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updatePost } from '../redux/features/post/postSlice';
import axios from '../utils/axios';

const EditPostPage = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [oldImage, setOldImage] = useState('');
  const [newImage, setNewImage] = useState('');

  const fetchPosts = useCallback(async () => {
    const { data } = await axios.get(`/posts/${params.id}`)
    setTitle(data.title)
    setText(data.text)
    setOldImage(data.imgUrl)
  }, [params.id])

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const clearFormHandler = () => {
    setTitle('');
    setText('');
  }

  const submitHandler = () => {
    try {
      const updatedPost = new FormData();
      updatedPost.append('title', title);
      updatedPost.append('text', text);
      updatedPost.append('id', params.id);
      updatedPost.append('image', newImage);
      dispatch(updatePost(updatedPost))
      navigate('/posts')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form className='w-1/3 mx-auto py-10'

      onSubmit={event => event.preventDefault()}
    >
      <label className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
        Pin an image:
        <input type="file" className='hidden'
          onChange={event => {
            setNewImage(event.target.files[0])
            setOldImage('')
          }
          } />
      </label>
      <div className='text-white flex object-cover py-2 justify-center'>
        {oldImage &&
          <img src={`http://localhost:3002/${oldImage}`} alt={''} />
        }
        {newImage &&
          <img src={`http://localhost:3002/${newImage}`} alt={''} />
        }
      </div>

      <label className='text-xs text-white opacity-70'>
        Title:
        <input type="text" value={title} onChange={event => setTitle(event.target.value)} placeholder='title' className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' />
        Text
        <textarea value={text} onChange={event => setText(event.target.value)} placeholder='text' className='mt-1 resize-none h-40 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs outline-none placeholder:text-gray-700' />
      </label>

      <div className='flex gap-8 items-center justify-center mt-4'>
        <button onClick={submitHandler} className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm py-2 px-4'>
          Add post
        </button>
        <button onClick={clearFormHandler} className='flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4'>
          Clear
        </button>
      </div>
    </form>
  )
}

export default EditPostPage