import { Router, Request, Response } from 'express'
import multer from 'multer'
import uploadConfig from './config/multer'

import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthController } from './controllers/user/AuthUserController'
import { DetailUserController } from './controllers/user/DetailUserController'
import { isAuthenticated } from './middlewares/isAuthenticated'
import { RemoveUserController } from './controllers/user/RemoveUserController'
import { CreateCategoryController } from './controllers/category/CreateCategoryController'
import { EditCategoryController } from './controllers/category/EditCategoryController'
import { ListCategoryController } from './controllers/category/ListCategoryController'
import { RemoveCategoryController } from './controllers/category/RemoveCategoryController'
import { CreateProductController } from './controllers/product/CreateProductController'
import { EditProductController } from './controllers/product/EditProductController'
import { ListProductByCategoryController } from './controllers/product/ListProductByCategoryController'
import { ListProductController } from './controllers/product/ListProductController'
import { RemoveProductController } from './controllers/product/RemoveProductController'
import { SaleProductController } from './controllers/sale/SaleProductController'

const router = Router()

// Configurations for upload
const upload = multer(uploadConfig.upload('./tmp'))

// User Routes
router.post('/user', new CreateUserController().handle)
router.post('/session', new AuthController().handle)
router.get('/me', isAuthenticated, new DetailUserController().handle)
router.delete('/user/remove', new RemoveUserController().handle)

// Category
router.post('/category', isAuthenticated, new CreateCategoryController().handle)
router.put(
  '/category/edit',
  isAuthenticated,
  new EditCategoryController().handle
)
router.get(
  '/category/all',
  isAuthenticated,
  new ListCategoryController().handle
)
router.delete(
  '/category/remove',
  isAuthenticated,
  new RemoveCategoryController().handle
)

// Product Routes
router.post(
  '/product',
  isAuthenticated,
  upload.single('file'),
  new CreateProductController().handle
)

router.put(
  '/product/edit',
  isAuthenticated,
  upload.single('file'),
  new EditProductController().handle
)

router.get(
  '/product',
  isAuthenticated,
  new ListProductByCategoryController().handle
)

router.get('/products', isAuthenticated, new ListProductController().handle)

router.delete(
  '/product/remove',
  isAuthenticated,
  new RemoveProductController().handle
)

// Sale Routes
router.put('/sale/product', isAuthenticated, new SaleProductController().handle)

export { router }
