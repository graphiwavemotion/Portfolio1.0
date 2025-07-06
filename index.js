import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import Contact from './models/Schema.js';

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
const DBURL = "mongodb+srv://graphiwavemotion:Mani@cluster0.egkicxy.mongodb.net/portfolio"
const connectToDB = async() => {
    await mongoose.connect(DBURL)
}

connectToDB().then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err);
}).finally(() =>  {
    console.log('MongoDB connection attempt finished');
})

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve contact form HTML
app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contacts.html'));
});

// Handle contact form submission
app.post('/contact/submit', async (req, res) => {
  const { name, email, message } = req.body;
  console.log(`Received contact form submission: Name: ${name}, Email: ${email}, Message: ${message}`);

  const contact = new Contact({
    name,
    email,
    message,    
    createdAt: new Date() // Set createdAt to current date
  })
  try {
    await contact.save();
    console.log('Contact saved to database');
    res.send("Data received successfully!");
  } catch (error) {
    console.log('Error saving contact to database:', error);
    res.status(500).send("Error saving data to database.");
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
