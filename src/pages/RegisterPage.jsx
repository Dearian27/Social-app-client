import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { checkIsAuth, registerUser } from '../redux/features/auth/authSlice';
import { toast } from 'react-toastify';

const RegisterPage = (props) => {
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
      dispatch(registerUser({ username, password }))
      setPassword('')
      setUsername('')
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}
      className="w-1/4 h-60 mx-auto mt-40"
    >
      <h1 className='text-lg text-center'>Registration</h1>
      <label className='text-xs text-gray-400'>
        Username:
        <input value={username} onChange={event => setUsername(event.target.value)} type="text" placeholder='Name'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs  outline-none placeholder:text-gray-700' />
      </label>
      <label className='text-xs text-gray-400'>
        Password:
        <input value={password} onChange={event => setPassword(event.target.value)} type="password" placeholder='Password'
          className='mt-1 text-black w-full rounded-lg bg-gray-400 border py-1 px-2 text-xs  outline-none placeholder:text-gray-700' />
      </label>
      <div className='flex gap-8 justify-center mt-4'>
        <button onClick={handleSubmit} className='flex justify-center items-center text-xs bg-gray-600 rounded-sm py-2 px-4'>
          Confirm
        </button>
        <Link to={'/login'} className='flex justify-center items-center text-xs text-white'>
          Already registered?
        </Link>
      </div>
    </form>

  )
}

export default RegisterPage