import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  name: { type: String, required: true },
  isAdmin: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model('User', userSchema);


