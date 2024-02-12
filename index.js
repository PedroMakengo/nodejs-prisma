import express from 'express'
import bodyParser from 'body-parser'
import { PrismaClient } from '@prisma/client'

const app = express()

const prisma = new PrismaClient({
  log: ['query'],
})

app.use(bodyParser.json())

// Criando um produto com um array de vários elementos
app.post('/products', async (req, res) => {
  const product = await prisma.product.create({
    data: {
      ...req.body,
      tags: {
        create: req.body.tags,
      },
    },
  })

  res.json(product)
})

app.get('/tags', async (req, res) => {
  // retrieve all the products of a given tag
  const tags = await prisma.tag.findMany({
    include: {
      products: true,
    },
  })
  // Retrieve all the tags of a given product
  res.json(tags)
})

app.listen(3000, () => {
  console.log('App working!')
})
