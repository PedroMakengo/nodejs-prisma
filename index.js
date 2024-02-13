import express from 'express'
import bodyParser from 'body-parser'
import { PrismaClient } from '@prisma/client'

import { z } from 'zod'

const app = express()

const ArticleCreateSchema = z.object({
  title: z.string().max(10),
  content: z.string().max(1000),
  state: z.enum(['DRAFT', 'PUBLISHED']),
})

const prisma = new PrismaClient({
  log: ['query'],
}).$extends({
  query: {
    article: {
      create: ({ args, query }) => {
        args.data = ArticleCreateSchema.parse(args.data)
        return query(args)
      },
    },
  },
})

app.use(bodyParser.json())

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()

  res.json(users)
})

app.post('/users/:userId/articles', async (req, res) => {
  try {
    const user = await prisma.user.findFirst({
      where: { id: +req.params.userId },
    })

    const data = {
      ...req.body,
      userId: user.id,
    }

    const article = await prisma.article.create({ data })

    res.json(article)
  } catch (error) {
    res.status(403).json(error?.issues)
  }
})

app.listen(3000, () => console.log('App working!'))
