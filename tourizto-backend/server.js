import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/bookingRoutes.js';
import testRoutes from './routes/testRoutes.js';
import adminRoutes from './routes/admin.js';
import emailTestRoute from './routes/emailTestRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());
app.use(express.json()); // parse JSON bodies

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// Routes
app.use('/api/users', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/test', testRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/email', emailTestRoute);

// Log all environment variables (for debugging)
console.log('Environment variables:');
console.log('- PORT:', process.env.PORT);
console.log('- EMAIL_USER:', process.env.EMAIL_USER);
console.log('- EMAIL_PASS:', process.env.EMAIL_PASS ? '******' : 'not set');

app.get('/', (_, res) => {
  res.send('Backend is running!');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

