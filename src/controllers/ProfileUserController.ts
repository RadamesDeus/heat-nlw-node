import { Request, Response } from 'express'
import { ProfileUserService } from '../services/ProfileUserService';

class ProfileUserController {
  async handle(request: Request, response: Response) {
    const { id } = await request.user
    const Profile = new ProfileUserService();
    const result = await Profile.execute(id);
    response.json(result)
  }
}

export { ProfileUserController }