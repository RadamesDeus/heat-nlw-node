import { Request, Response } from 'express'
import { ShowMessageService } from '../services/ShowMessageService';

class ShowMessageController {
  async handle(request: Request, response: Response) {

    const message = new ShowMessageService();
    const result = await message.execute();
    response.json(result)
  }
}

export { ShowMessageController }