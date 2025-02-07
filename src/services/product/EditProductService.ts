import prismaClient from '../../prisma'
import { EditProductRequest } from '../../models/interfaces/product/EditProductRequest'

class EditProductService {
  async execute({
    name,
    price,
    description,
    banner,
    amount,
    product_id,
  }: EditProductRequest) {
    const productEdited = await prismaClient.product.update({
      where: {
        id: product_id,
      },
      data: {
        name,
        price,
        description,
        banner,
        amount: +amount,
      },
    })

    return productEdited
  }
}

export { EditProductService }
