import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'

import cors from 'cors';
import { Server as socketIOServer } from 'socket.io'
import router from './routes/socketRoutes.js'
import { addUser, removeUser, getUser, getUsersInRoom } from './data/socketUsers.js'

dotenv.config()

connectDB()

const app = express()

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => {
    res.send('API is running....')
  })
}

app.use(notFound)
app.use(errorHandler)

// Using Cors for socketio
app.use(cors())
// Socket Routes
app.use(router)


const PORT = process.env.PORT || 5000

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)

const io = new socketIOServer(server, { cors: true });

// Socket Connection
io.on('connection', (socket) => {
  console.log('We have a new conneciton!!!');

  // JOIN A ROOM.
  socket.on('join', ({ name, room }, callback) => {
    console.log(name, room)
    // ADD USER TO LIST OF USERS. ERRORS ? ERRORS : ADD
    const { error, user } = addUser({ id: socket.id, name, room });
    if (error) return callback(error)

    // ADMIN IS MADE AWARE OF THE ADDITIONAL USER
    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` })
    // EVERYBODY ELSE IN ROOM IS MADE AWARE OF ADDITIONAL USER
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name}, has joined!` })

    // NEW USER'S SOCKET IS ADDED TO THE SPECIFIED ROOM
    socket.join(user.room);

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) })

    callback();
  });

  // WHEN USER ENTERES ROOM, SEND MESSAGE FROM USER TO EVERYBODY ELSE IN ROOM
  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
    callback();
  })

  // DISCONNECTING SOCKET
  socket.on('disconnect', () => {
    console.log('User had left!!!');
    const user = removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left` })
    }
  });
})
