import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

console.log('Environment Variables Test:');
console.log('-------------------------');
console.log('PORT:', process.env.PORT);
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '******' : 'Not set');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Set' : 'Not set');
console.log('MONGO_URI:', process.env.MONGO_URI ? 'Set' : 'Not set');
console.log('FRONTEND_URL:', process.env.FRONTEND_URL);
console.log('-------------------------');

// Test if .env file is being loaded from the correct location
console.log('Current directory:', __dirname);
console.log('.env file path:', path.resolve(__dirname, '.env'));
