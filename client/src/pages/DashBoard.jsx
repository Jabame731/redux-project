import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import NoteForm from '../components/NoteForm';
import NoteItem from '../components/NoteItem';
import Loading from '../components/Loading';

import { getNotes, reset } from '../redux/notes/noteSlice';
import { Header } from '../components/Header';

import { MdDelete } from 'react-icons/md';

const DashBoard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { notes, isLoading, isError, message } = useSelector(
    (state) => state.notes
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) {
      navigate('/login');
    }

    dispatch(getNotes());

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      <div className='mt-10 mx-auto max-w-7xl px-4  sm:px-6   lg:px-8 '>
        <NoteForm />

        <section className='content'>
          {notes.length > 0 ? (
            <div className='note'>
              {notes.map((note) => (
                <NoteItem key={note._id} note={note} />
              ))}
            </div>
          ) : (
            <h3>No Notes Added Yet!</h3>
          )}
        </section>
      </div>
    </>
  );
};

export default DashBoard;
