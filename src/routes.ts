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

export { router }
