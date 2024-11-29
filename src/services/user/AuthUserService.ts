import { compare } from 'bcryptjs'
import { sign } from 'jsonwebtoken'
import prismaClient from '../../prisma'
import { AuthRequest } from '../../models/interfaces/user/auth/AuthRequest'

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    // Verificar no banco de dados se existe um usuário com o email passado
    const user = await prismaClient.user.findFirst({
      where: { email },
    })

    if (user) {
    }
  }
}

export { AuthUserService }
