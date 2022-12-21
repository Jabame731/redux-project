import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote } from '../redux/notes/noteSlice';

const NoteItem = ({ note }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div class='flex items-center justify-between mt-[10px]'>
        <span class='text-sm font-light text-gray-600 dark:text-gray-400'>
          {new Date(note.createdAt).toLocaleString('en-US')}
        </span>
      </div>

      <div className='p-4 flex items-center justify-between relative border-b border-green-700'>
        <h3 className='font-bold text-green-900'>{note.text}</h3>

        <div className='flex space-x-2'>
          <button
            onClick={() => dispatch(deleteNote(note._id))}
            class='font-bold text-rose-700 cursor-pointer dark:text-gray-200'
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
