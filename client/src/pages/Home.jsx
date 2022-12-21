import React from 'react';
import { Link } from 'react-router-dom';
import girlBook from '../assets/bookgirl.jpg';
import hello from '../assets/hellocat.gif';

import Typed from 'react-typed';
import { Header } from '../components/Header';

import { useSelector } from 'react-redux';

const Home = () => {
  const { user } = useSelector((state) => state.auth);

  console.log(user);
  return (
    <>
      <Header />
      <main className='mt-10 mx-auto max-w-7xl px-4  sm:px-6   lg:px-8 '>
        <div className='sm:text-center lg:text-left'>
          <section className=' flex items-center bg-primary lg:bg-cover lg:bg-center lg:bg-no-repeat  lg:py-0 overflow-hidden'>
            <div className='container mx-auto h-full'>
              <div className='flex items-center h-full pt-8'>
                <div className='flex-1 flex flex-col items-center lg:items-start'>
                  <p className='text-lg text-accent text-md mb-[22px]'>
                    Hey, Welcome to Note
                  </p>
                  <img
                    src={hello}
                    alt='hello-cat'
                    className='hidden md:block h-[100px] w-[200px] absolute top-0 ml-[220px] mt-[100px]'
                  />
                  <h1 className='text-4xl leading-[44px] md:text-5xl md:leading-tight lg:text-7xl lg:leading-[1.2] font-bold md:tracking-[-2px]'>
                    Notes for <br />
                    <Typed
                      strings={[
                        'Reminders',
                        'Dates',
                        'Appoinments',
                        'And Many More..',
                      ]}
                      typeSpeed={40}
                      backSpeed={50}
                      loop
                      className='text-[#ef5b0ccb]'
                    />
                  </h1>
                  <p className='pt-4 pb-8 md:pt-6 md:pb-12 max-w-[480px] text-lg text-center lg:text-left text-gray-900'>
                    Explore more here
                  </p>
                  <button className='flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10'>
                    <Link to={`${user ? '/dashboard' : '/login'}`}>
                      Get Started
                    </Link>
                  </button>
                </div>
                <div className='hidden lg:flex flex-1 justify-end items-end h-full'>
                  <img src={girlBook} alt='girl-reading-book' />
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
};

export default Home;
