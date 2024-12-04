import { Router, Request, Response } from 'express'
import { CreateUserController } from './controllers/user/CreateUserController'
import { AuthController } from './controllers/user/AuthUserController'

const router = Router()

// User Routes
router.post('/user', new CreateUserController().handle)
router.post('/session', new AuthController().handle)

export { router }
