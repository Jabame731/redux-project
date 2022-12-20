import Note from '../models/NoteModel.js';
import User from '../models/UserModel.js';

//create note
export const createNote = async (req, res, next) => {
  const userId = req.params.userId;
  const note = new Note(req.body);

  try {
    const newNote = await note.save();

    try {
      await User.findByIdAndUpdate(userId, {
        $push: { note: newNote._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(newNote);
  } catch (err) {
    next(err);
  }
};

//update
export const updateNote = async (req, res, next) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedNote);
  } catch (err) {
    next(err);
  }
};

//delete note
export const deleteNote = async (req, res, next) => {
  const noteId = req.params.id;

  const userId = req.params.userId;

  try {
    await Note.findByIdAndDelete(req.params.id);

    try {
      await User.findByIdAndUpdate(userId, {
        $pull: {
          note: noteId,
        },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json('review has been deleted');
  } catch (err) {
    next(err);
  }
};

//get all notes by user Id
export const getAllNotes = async (req, res, next) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    const idNotes = user.note;

    const name = [];

    const getName = await Note.findById(idNotes);

    // const getName = await Note.findById(idNotes);
    await Promise.all(
      idNotes.map(async (idNote) => {
        const getName = await Note.findById(idNote);

        const getNameNote = getName.note;

        name.push(getNameNote);
      })
    );

    res.status(200).json(name);
  } catch (err) {
    next(err);
  }
};

//get note name by id
export const getNoteByIdName = async (req, res, next) => {
  try {
    const getNote = await Note.find({})
      .populate('user', '-password')
      .populate('note', '-password');

    res.send(getNote);
  } catch (err) {
    next(err);
  }
};
