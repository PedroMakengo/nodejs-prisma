import prismaClient from '../../prisma'
import { CategoryRequest } from '../../models/interfaces/category/CategoryRequest'

class CreateCategoryService {
  async execute({ name }: CategoryRequest) {
    // Validação para não aceitar null, vazio e undefined
    if (name === '' || name === null || name === undefined) {
      throw new Error('Invalid name')
    }

    // Verificar se existe uma categoria com o mesmo nome...
    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: { name },
    })

    if (categoryAlreadyExists) {
      throw new Error('Category already exists')
    }

    // Criar uma categoria
    const category = await prismaClient.category.create({
      data: { name },
    })

    return category
  }
}

export { CreateCategoryService }
