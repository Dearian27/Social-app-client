import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice';


const LoginPage = (props) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isAuth = useSelector(checkIsAuth)

  const { status } = useSelector(state => state.auth)

  useEffect(() => {
    if (status) toast(status)
    if (isAuth) navigate('/')
  }, [status, isAuth, navigate]);


  const handleSubmit = async () => {
    try {
      dispatch(loginUser({ username, password }))
    }
    catch (err) {
      console.log(err)
    }
  }

  return (

    <form onSubmit={(e) => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40"
    >
      <h1 className='text-lg text-center'>Authorization</h1>
      <label className='text-xs text-gray-400'>
        Username:
        <input onChange={event => setUsername(event.target.value)} value={username}
          type="text" placeholder='Name'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs  outline-none placeholder:text-gray-700' />
      </label>
      <label className='text-xs text-gray-400'>
        Password:
        <input onChange={event => setPassword(event.target.value)} value={password}
          type="password" placeholder='Password'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs  outline-none placeholder:text-gray-700' />
      </label>
      <div className='flex gap-8 justify-center mt-4'>
        <button onClick={handleSubmit} className='flex justify-center items-center text-xs bg-gray-600 rounded-sm py-2 px-4'>
          Sign in
        </button>
        <Link to={'/register'} className='flex justify-center items-center text-xs text-white'>
          Have not account?
        </Link>
      </div>
    </form>
  )
}

export default LoginPage