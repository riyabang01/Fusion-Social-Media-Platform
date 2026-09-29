require('dotenv').config();
const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');
const SocketServer = require('./socketServer');
const authCtrl = require('./controllers/authCtrl');

mongoose.set('strictPopulate', false);

const app = express();

const corsOptions = {
  origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const authRouter = require('./routes/authRouter');
const postRouter = require('./routes/postRouter');
const notifyRouter = require('./routes/notifyRouter');
const commentRouter = require('./routes/commentRouter');
const messageRouter = require('./routes/messageRouter');
const userRouter = require('./routes/userRouter');
const adminRouter = require('./routes/adminRouter');

app.post('/api/login', authCtrl.login);
app.post('/api/admin_login', authCtrl.adminLogin);
app.post('/api/logout', authCtrl.logout);
app.post('/api/refresh_token', authCtrl.generateAccessToken);

app.use('/api', authRouter);
app.use('/api', postRouter);
app.use('/api', notifyRouter);
app.use('/api', commentRouter);
app.use('/api', messageRouter);
app.use('/api', userRouter); 
app.use('/api', adminRouter);

app.use('/api/*any', (req, res) => {
  res.status(404).json({ message: "API endpoint not found." });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));
  
  app.get('*any', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
    methods: ["GET", "POST"]
  },
  allowEIO3: true,
  transports: ["polling", "websocket"]
});

io.on('connection', (socket) => {
  console.log('New socket connected:', socket.id);
  SocketServer(io, socket);
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
