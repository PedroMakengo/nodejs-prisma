import { Request, Response } from 'express'
import { ListProductService } from '../../services/product/ListProductService'

class ListProductController {
  async handle(request: Request, response: Response) {
    const listProductsService = new ListProductService()
    const products = await listProductsService.execute()

    return response.json(products)
  }
}

export { ListProductController }
