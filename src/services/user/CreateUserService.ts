import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'
import { UserRequest } from '../../models/interfaces/user/UserRequest'

class CreateUserService {
  async execute({ name, email, password }: UserRequest) {
    if (!email) {
      throw new Error('E-mail incorrect')
    }

    const userAlreadyExists = await prismaClient.user.findFirst({
      where: { email },
    })

    if (userAlreadyExists) {
      throw new Error('E-mail already exists')
    }

    // Encriptando a nossa senha do usuário
    const passwordHash = await hash(password, 8)

    // Criando nosso usuário
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    return user
  }
}

export { CreateUserService }
