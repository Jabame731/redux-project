import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { createNote } from '../redux/notes/noteSlice';

const NoteForm = () => {
  const [text, setText] = useState('');

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(createNote({ text }));
    setText('');
  };

  return (
    <>
      <form onSubmit={onSubmit} className='my-10'>
        <div className='flex flex-col space-y-5'>
          <label for='text'>
            <p className='font-medium text-slate-700 pb-2'>Add a Note</p>
            <textarea
              id='text'
              name='text'
              type='text'
              className='w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow'
              placeholder='Enter Note'
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>

          <button className='w-full py-3 font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center'>
            <span>Submit Note</span>
          </button>
        </div>
      </form>
    </>
  );
};

export default NoteForm;
