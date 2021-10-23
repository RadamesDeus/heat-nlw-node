import { Request, Response } from 'express'
import { CreateMessageService } from '../services/CreateMessageService';

class MessageController {
  async handle(request: Request, response: Response) {
    const { text } = request.body;


    const user_id = request.user.id;
    const message = new CreateMessageService();
    const result = await message.execute(text, user_id);


    response.json(result)
  }
}

export { MessageController }