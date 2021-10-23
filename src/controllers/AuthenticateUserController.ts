import { Request, Response } from 'express'
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { code } = request.query;
    const authService = new AuthenticateUserService();
    const result = await authService.execute(code as string)
    response.json(result)

    // response.redirect(`/dashboard`)
  }
}

export { AuthenticateUserController }