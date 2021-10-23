import 'dotenv/config';
import express, { Request, Response, NextFunction } from 'express';
import { router } from './routes';
import AppError from './errors/AppError';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express()

const httpServer = createServer(app);
const sockets = new Server(httpServer, { cors: { origin: '*' } });

const connectedUsers: IConnectedUser[] = [];

interface IConnectedUser {
  userIO: string;
  user: string;
}

sockets.on('connection', socket => {
  const { user } = socket.handshake.query;
  const connectedUser: IConnectedUser = {
    user: user as string,
    userIO: socket.id,
  };

  connectedUsers.push(connectedUser);

  socket.on('disconnect', () => {
    const userIndex = connectedUsers.findIndex(
      index => index.userIO === socket.id,
    );
    connectedUsers.splice(userIndex, 1);
    console.log(`> User disconnected on server with id: ${userIndex}`);
  });


  console.log('Server connectedUsers', connectedUsers);
});

app.use(cors());

app.use(express.json());


app.get('/github', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_ID}`)
})

app.use(router)

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
    console.log(err);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  },
);

app.get('/dashboard', (req, res) => {
  res.json({ page: "dashboard" })
})

export { httpServer, sockets, connectedUsers }