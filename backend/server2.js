// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');

const app = express();
const PORT = 5000; // You can change this port if necessary

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/mern_form_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

// Create a basic mongoose schema for the form data
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  profileImage: String,
});

const FormModel = mongoose.model('Form', formSchema);

// Multer middleware to handle file uploads
const upload = multer({ dest: 'uploads/' });

// Endpoint to handle form data submission
// backend/server.js

// ... (previous code)

// Endpoint to handle form data submission
app.post('/api/form', upload.single('profileImage'), async (req, res) => {
    const { name, email, password } = req.body;
    const profileImage = req.file ? req.file.filename : '';
  
    try {
      const formData = new FormModel({ name, email, password, profileImage });
      await formData.save();
      res.status(201).json({ message: 'Form data saved successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error saving form data' });
    }
  });
  
  // ... (rest of the code)
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
