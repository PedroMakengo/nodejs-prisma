import express from 'express'
import bodyParser from 'body-parser'
import { PrismaClient } from '@prisma/client'

const app = express()

const prisma = new PrismaClient()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello prisma')
})

// CREATE
app.post('/articles', async (req, res) => {
  await prisma.article.create({
    data: req.body,
  })
  res.json({ success: true })
})

app.get('/articles', async (req, res) => {
  // 1. retrive all articles
  const articles = await prisma.article.findMany()

  res.json(articles)
})

app.get('/articles/:id', async (req, res) => {
  // 2. retreive a particular article
  const article = await prisma.article.findFirstOrThrow({
    where: { id: +req.params.id },
  })

  res.json(article)
})

app.get('/articles/draft', async (req, res) => {
  // 3. retrieve articles based on a condition (fetch all articles in draft state)
  const articles = await prisma.article.findMany({ where: { state: 'DRAFT' } })
  res.json(articles)
})

app.put('/articles/:id', async (req, res) => {
  const article = await prisma.article.update({
    where: { id: +req.params.id },
    data: req.body,
  })

  res.json(article)
})

app.delete('articles/:id', async (req, res) => {
  const article = await prisma.article.delete({ where: { id: +req.params.id } })

  res.json(article)
})

app.listen(3000, () => {
  console.log('App working!')
})
