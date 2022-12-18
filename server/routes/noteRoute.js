import express from 'express';

import {
  createNotes,
  updateNote,
  deleteNote,
  getAllNotesByUser,
} from '../controllers/noteController.js';

import token from '../middlewares/authorizationMiddleware.js';

const router = express.Router();

router.get('/:id', token, getAllNotesByUser);
router.post('/', token, createNotes);
router.delete('/:id', token, deleteNote);
router.put('/:id', token, updateNote);

export default router;
