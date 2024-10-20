const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/reunion', { useNewUrlParser: true, useUnifiedTopology: true });

// User Model
const User = mongoose.model('User', {
  name: String,
  email: String,
  graduationYear: Number,
  password: String,
});

// Routes
app.post('/register', async (req, res) => {
  const { name, email, graduationYear, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, graduationYear, password: hashedPassword });
  await user.save();
  res.send({ message: 'User registered!' });
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.encode({ id: user._id }, 'your_secret_key');
    res.send({ token });
  } else {
    res.status(401).send({ error: 'Invalid credentials' });
  }
});

// Socket.IO for Real-time Chat
io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('send_message', (message) => {
    io.emit('receive_message', message);
  });
});

server.listen(5000, () => console.log('Server running on port 5000'));
