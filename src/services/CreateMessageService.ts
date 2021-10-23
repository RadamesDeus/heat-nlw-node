import { connectedUsers, sockets } from '../app';
import prismaClient from '../prisma';

interface IMsg {
  msg: string;
}

class CreateMessageService {

  async execute(text: string, user_id: string) {
    const messase = await prismaClient.message.create({
      data: {
        text,
        user_Id: user_id,
      },
      include: {
        user: true
      }
    })

    const newMsg = {
      text,
      user_id,
    }

    sockets.emit('new_message', newMsg)

    return messase
  }

}

export { CreateMessageService }