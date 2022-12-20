import express from 'express';

import {
  createNote,
  updateNote,
  deleteNote,
  getAllNotes,
  getNoteByIdName,
} from '../controllers/NoteController.js';

import { verifyUser } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/:userId', verifyUser, createNote);
router.put('/:id', verifyUser, updateNote);
router.delete('/:userId/:id', verifyUser, deleteNote);
router.get('/all/:id', verifyUser, getAllNotes);

export default router;
