import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema(
  {
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    note: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Note', NoteSchema);
