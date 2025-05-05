// const express = require('express');
// const multer = require('multer');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const path = require('path');

// const app = express();
// app.use(cors());
// app.use(express.json());

// // Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/models');

// mongoose.connection.on('connected', () => {
//   console.log('MongoDB connected successfully');
// });

// mongoose.connection.on('error', (err) => {
//   console.error('MongoDB connection error:', err);
// });

// // Define a schema for storing model metadata
// const modelSchema = new mongoose.Schema({
//   name: String,
//   fileUrl: String,
// });

// const Model = mongoose.model('Model', modelSchema);

// // Set up Multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// // API to upload a model
// app.post('/upload', upload.single('model'), async (req, res) => {
//   const model = new Model({
//     name: req.body.name,
//     fileUrl: `http://localhost:5000/uploads/${req.file.filename}`,
//   });
//   await model.save();
//   res.json({ message: 'Model uploaded successfully', model });
// });

// // API to fetch all models
// app.get('/models', async (req, res) => {
//   const models = await Model.find();
//   res.json(models);
// });

// // Serve uploaded files
// app.use('/uploads', express.static('uploads'));

// // Start the server
// app.listen(5000, () => {
//   console.log('Server is running on http://localhost:5000');
// });
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // Serve static files

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/models', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Schema & Model
const modelSchema = new mongoose.Schema({
  name: String,
  fileUrl: String,
});

const Model = mongoose.model('Model', modelSchema);

// Multer Storage Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// Routes
// app.post('/upload', upload.single('model'), async (req, res) => {
//   try {
//     const model = new Model({
//       name: req.body.name,
//       fileUrl: `http://localhost:5000/uploads/${req.file.filename}`,
//     });
//     await model.save();
//     res.json({ message: 'Model uploaded successfully', model });
//   } catch (err) {
//     console.error('Upload error:', err);
//     res.status(500).json({ error: 'Failed to upload model' });
//   }
// });
app.post('/upload', upload.single('model'), async (req, res) => {
  try {
    const { name, type } = req.body;

    // Validate type
    if (!['interior', 'exterior'].includes(type)) {
      return res.status(400).json({ error: 'Invalid type. Must be "interior" or "exterior".' });
    }

    const model = new Model({
      name,
      fileUrl: `http://localhost:${process.env.PORT}/uploads/${req.file.filename}`,
      type,
    });

    await model.save();
    res.json({ message: 'Model uploaded successfully', model });
  } catch (err) {
    res.status(500).json({ error: 'Failed to upload model' });
  }
});

app.get('/models', async (req, res) => {
  try {
    const models = await Model.find();
    res.json(models);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch models' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
