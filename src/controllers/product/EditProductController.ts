import { Request, Response } from 'express'

import prismaClient from '../../prisma'
import { EditProductRequest } from '../../models/interfaces/product/EditProductRequest'
import { EditProductService } from '../../services/product/EditProductService'

class EditProductController {
  async handle(request: Request, response: Response) {
    const {
      name,
      price,
      description,
      banner,
      amount,
      product_id,
    }: EditProductRequest = request.body

    const editProductService = new EditProductService()

    const productEdited = await editProductService.execute({
      name,
      price,
      description,
      banner,
      amount,
      product_id,
    })

    return response.json(productEdited)
  }
}

export { EditProductController }
