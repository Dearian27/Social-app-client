import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom'
import { toast } from 'react-toastify';
import { checkIsAuth, logout } from '../redux/features/auth/authSlice';

const Navbar = (props) => {

  const dispatch = useDispatch();

  const isAuth = useSelector(checkIsAuth);

  const activeStyles = {
    color: 'white',
  }

  const logoutHandler = () => {
    dispatch(logout());
    window.localStorage.removeItem('token');
    toast("you are logged out")

  }

  return (
    <div className='flex py-4 justify-between items-center'>
      <Link to="/">
        <span className='flex justify-center items-center w-6 h-6 bg-gray-600 text-xs text-white rounded-sm'>
          DF
        </span>
      </Link>
      {isAuth &&
        <ul className="flex gap-8">
          <li>
            <NavLink to={"/"} href="/" className='text-xs text-gray-400 hover:text-white'
              style={({ isActive }) => isActive ? activeStyles : undefined}
            >
              Main
            </NavLink>
          </li>
          <li>
            <NavLink to={"/posts"} href="/posts" className='text-xs text-gray-400 hover:text-white'
              style={({ isActive }) => isActive ? activeStyles : undefined}
            >
              My posts
            </NavLink>
          </li>
          <li>
            <NavLink to={"/new"} href="/new" className='text-xs  text-gray-400 hover:text-white'
              style={({ isActive }) => isActive ? activeStyles : undefined}
            >
              Add post
            </NavLink>
          </li>
        </ul>
      }

      <div className='flex justify-center items-center bg-gray-600 text-xs text-white rounded-sm px-4 py-2'>
        {isAuth ?
          <button onClick={logoutHandler}>Sign out</button>
          :
          <Link to={'/login'}>Sign in</Link>
        }
      </div>
    </div>
  )
}

export default Navbar