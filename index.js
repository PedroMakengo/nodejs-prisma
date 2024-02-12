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

app.post('/users', async (req, res) => {
  const user = await prisma.user.create({ data: req.body })
  res.json(user)
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

app.post('/users/:userId/carts', async (req, res) => {
  // 1. To get the user
  const user = await prisma.user.findFirstOrThrow({
    where: { id: +req.params.userId },
  })

  // 2. to get the product {product: 1 quantity: 3}
  const product = await prisma.product.findFirstOrThrow({
    where: { id: +req.body.product },
  })

  // 3. To construct the data and create a cart
  const data = {
    userId: user.id,
    productId: product.id,
    quantity: req.body.quantity,
  }

  const cart = await prisma.cart.create({ data })

  res.json(cart)
})

app.get('/users/:userId/carts', async (req, res) => {
  const user = await prisma.user.findFirstOrThrow({
    where: { id: +req.params.userId },
  })

  const cart = await prisma.cart.findMany({
    where: { userId: user.id },
    include: { product: true },
  })

  res.json(cart)
})

app.listen(3000, () => {
  console.log('App working!')
})
