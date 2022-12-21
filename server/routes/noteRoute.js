import express from 'express';

import {
  getNotes,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/NoteController.js';

import { verifyUser } from '../middlewares/verifyToken.js';

const router = express.Router();

router.post('/', verifyUser, createNote);
router.put('/:id', verifyUser, updateNote);
router.delete('/:id', verifyUser, deleteNote);
router.get('/', verifyUser, getNotes);

export default router;
