require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const http = require('http');
const { Server } = require('socket.io');

const SocketServer = require('./socketServer');
const authCtrl = require('./controllers/authCtrl');

const app = express();

// -------------------- CORS --------------------
const corsOptions = {
  origin: "http://localhost:3000", // Frontend URL
  credentials: true,
};
app.use(cors(corsOptions));

// -------------------- Middleware --------------------
app.use(express.json());
app.use(cookieParser());

// -------------------- Routes --------------------
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const commentRouter = require('./routes/commentRouter');
const adminRouter = require('./routes/adminRouter');
const notifyRouter = require('./routes/notifyRouter');
const messageRouter = require('./routes/messageRouter');

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/post', postRouter);
app.use('/api/comment', commentRouter);
app.use('/api/admin', adminRouter);
app.use('/api/notify', notifyRouter);
app.use('/api/message', messageRouter);

// Direct login fixes for frontend
app.post('/api/login', authCtrl.login);
app.post('/api/admin_login', authCtrl.adminLogin);

// Refresh token endpoint
app.post('/api/refresh_token', authCtrl.generateAccessToken);

// -------------------- Database Connection --------------------
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("Database connected successfully!"))
  .catch((err) => console.log("MongoDB connection error:", err));

// -------------------- Socket.io --------------------
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('New socket connected:', socket.id);
  SocketServer(socket);
});

// -------------------- Start Server --------------------
const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
