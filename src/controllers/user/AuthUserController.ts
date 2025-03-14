import { Request, Response } from 'express'
import { AuthUserService } from '../../services/user/AuthUserService'
import { AuthRequest } from '../../models/interfaces/user/auth/AuthRequest'

class AuthController {
  async handle(request: Request, response: Response) {
    const { email, password }: AuthRequest = request.body

    const authUserService = new AuthUserService()
    const auth = await authUserService.execute({ email, password })

    return response.json(auth)
  }
}

export { AuthController }
