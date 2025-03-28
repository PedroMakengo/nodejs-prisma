import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import cors from 'cors'
import { router } from './routes'
import path from 'path'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'

const app = express()
const port = 3333

app.use(express.json())
app.use(cors())
// Documentação do Swagger
app.use('/v1', router)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))
app.use(
  (
    error: Error,
    request: Request,
    response: Response,
    next: NextFunction
  ): any => {
    if (error instanceof Error) {
      return response.status(400).json({
        error: error.message,
      })
    }

    return response.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
    })
  }
)

app.get('/terms', (request: Request, response: Response) => {
  return response.json({
    message: 'Termos de serviço',
  })
})

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`)
})
