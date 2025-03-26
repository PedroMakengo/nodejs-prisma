import prismaClient from '../../prisma'
import { SaleProductRequest } from '../../models/interfaces/sale/SaleProductRequest'

class SaleProductService {
  async execute({ product_id, amount }: SaleProductRequest) {
    if (!product_id || !amount) {
      throw new Error('Dados de entrada não foram passados corretamente')
    }

    // Encontrar o produto que foi passado
    const queryProduct = await prismaClient.product.findFirst({
      where: {
        id: product_id,
      },
    })
    const productAmount = queryProduct?.amount ?? 0

    // Verificar a quantidade do produto
    if (productAmount > amount && amount > 0) {
      const newAmount = productAmount - amount
      const saveSale = await prismaClient.product.update({
        where: {
          id: product_id,
        },
        data: {
          amount: newAmount,
        },
        select: {
          id: true,
          name: true,
          amount: true,
        },
      })

      return saveSale
    } else {
      throw new Error('Não foi possível efetuar a venda!')
    }
  }
}
export { SaleProductService }
