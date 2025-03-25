import prismaClient from '../../prisma'

class ListProductService {
  async execute() {
    const products = await prismaClient.product.findMany({
      select: {
        id: true,
        name: true,
        amount: true,
      },
    })
    return products
  }
}
export { ListProductService }
