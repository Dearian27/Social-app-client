import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createPost } from '../redux/features/post/postSlice';

const AddPostPage = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [image, setImage] = useState('');

  const submitHandler = () => {
    try {
      const data = new FormData();
      data.append('title', title)
      data.append('text', text)
      data.append('image', image)

      dispatch(createPost(data))
      navigate('/')
    }
    catch (error) {
      console.log(error)
    }
  }

  const clearForm = () => {
    setText('')
    setTitle('')
  }
  return (
    <form className='w-1/3 mx-auto py-10'

      onSubmit={event => event.preventDefault()}
    >
      <label className='text-gray-300 py-2 bg-gray-600 text-xs mt-2 flex items-center justify-center border-2 border-dotted cursor-pointer'>
        Pin an image:
        <input type="file" className='hidden'
          onChange={event => setImage(event.target.files[0])} />
      </label>
      <div className='text-white flex object-cover py-2 justify-center'>
        {image &&
          <img src={URL.createObjectURL(image)} alt={image.filename} />
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
        <button onClick={clearForm} className='flex justify-center items-center bg-red-500 text-xs text-white rounded-sm py-2 px-4'>
          Clear
        </button>
      </div>
    </form>
  )
}

export default AddPostPage