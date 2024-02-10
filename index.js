import express from 'express'
import bodyParser from 'body-parser'
import { PrismaClient } from '@prisma/client'

const app = express()

const prisma = new PrismaClient()

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello prisma')
})

app.post('/articles', async (req, res) => {
  await prisma.article.create({
    data: req.body,
  })

  res.json({ success: true })
})

app.listen(3000, () => {
  console.log('App working!')
})
