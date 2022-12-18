import UserModel from '../models/UserModel.js';
import NoteModel from '../models/NoteModel.js';

export const getAllNotesByUser = async (req, res) => {
  const notes = await NoteModel.find({ userRef: req.userRef.id });

  res.status(200).json(notes);
};

//create note
export const createNotes = async (req, res) => {
  if (!req.body.note) {
    res.status(400);
    throw new Error('Please add a Note');
  }

  const note = await NoteModel.create({
    note: req.body.note,
    userRef: req.userRef.id,
  });

  res.status(200).json(note);
};

//update note
export const updateNote = async (req, res) => {
  const note = await NoteModel.findById(req.params.id);

  if (!note) {
    res.status(401);
    throw new Error('Note not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not Found');
  }

  if (note.userRef.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User is not Authorized to update the note');
  }

  const updatedNote = await NoteModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedNote);
};

//delete note
export const deleteNote = async (req, res) => {
  const note = await NoteModel.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error('Note not found');
  }

  if (!req.user) {
    res.status(401);
    throw new Error('User not Found');
  }

  if (note.userRef.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User is not Authorized to delete the note');
  }

  await note.remove();

  res.status(200).json({ id: req.params.id });
};
