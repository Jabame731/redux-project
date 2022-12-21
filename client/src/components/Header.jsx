import React, { useState } from 'react';

import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';

import { Link, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../redux/auth/authSlice';

export const Header = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => {
    setNav(!nav);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  console.log(user);

  // const capitalized = capitalizeFirstLetter(getUserName);
  // console.log(capitalized);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };

  return (
    <>
      <div className='w-full h-[90px]'>
        <div className='max-w-[1240px] mx-auto px-4 flex justify-between items-center h-full'>
          <Link to='/'>
            <div>
              <h1 className='text-[#ef5b0ccb] text-4xl'>Note</h1>
            </div>
          </Link>

          <div className='justify-between items-center  md:flex '>
            <Link to='/dashboard'>
              <div className=''> {user ? 'Hello' + ' ' + user.name : null}</div>
            </Link>

            <ul className='flex text-gray-600 items-center'>
              {user ? (
                <button onClick={onLogout}>
                  <li className='text-xl'>
                    <FiLogOut />
                  </li>
                </button>
              ) : (
                <>
                  <Link to='/login'>
                    <li className='px-[20px]'>Login</li>
                  </Link>
                  <Link to='/register'>
                    <li>Register</li>
                  </Link>
                </>
              )}
            </ul>
          </div>

          {/* Hamburger menu */}
          <div onClick={handleNav} className='block md:hidden'>
            {nav ? (
              <AiOutlineClose size={30} className='text-gray-500' />
            ) : (
              <AiOutlineMenu size={30} className='text-gray-500' />
            )}
          </div>

          {/* Mobile Menu */}
          <div
            className={
              nav
                ? 'w-full  text-gray-800 bg-orange-400 h-100vh absolute top-[90px] left-0 flex justify-center text-center text-xl'
                : 'absolute left-[-100%]'
            }
          >
            <ul>
              {user ? (
                <button onClick={onLogout}>
                  <li className='text-xl'>
                    <FiLogOut />
                  </li>
                </button>
              ) : (
                <>
                  <Link to='/login'>
                    <li>Login</li>
                  </Link>
                  <Link to='/register'>
                    <li>Register</li>
                  </Link>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
