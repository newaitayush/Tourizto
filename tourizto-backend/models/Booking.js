import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  place: {
    type: String,
    required: true
  },
  placeId: {
    type: mongoose.Schema.Types.Mixed, // Accept any type of ID (string, number, ObjectId)
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  adults: {
    type: Number,
    required: true,
    min: 1
  },
  children: {
    type: Number,
    default: 0
  },
  specialRequests: {
    type: String,
    default: ''
  },
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed'
  },
  bookingReference: {
    type: String,
    required: true,
    unique: true
  },
  receiptNumber: {
    type: String,
    default: function() {
      // Generate a unique receipt number based on timestamp and random number
      return `RCPT-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
    },
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
