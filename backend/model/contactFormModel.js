import mongoose from 'mongoose';

const contactFormSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['doctor', 'assistant'],
  },
  expertise: {
    type: String,
    trim: true,
    required: function () {
      return this.role === 'doctor';
    },
  },
  education: {
    type: String,
    trim: true,
    required: function () {
      return this.role === 'doctor';
    },
  },
  yearsOfExpertise: {
    type: Number,
    min: 0 
  },
  message: {
    type: String,
    trim: true,
  },
}, { timestamps: true });

export default mongoose.model('ContactForm', contactFormSchema);
