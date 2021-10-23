interface IConnectedUser {
  userIO: string;
  user: string;
}
declare namespace Express {
  // eslint-disable-next-line @typescript-eslint/interface-name-prefix
  export interface Request {
    user: {
      id: string;
    };
    io: SocketIO.Server;
    ioUser: string;
    connectedUsers: IConnectedUser[];
  }
}
