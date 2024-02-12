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

app.delete('/articles/:id', async (req, res) => {
  const article = await prisma.article.delete({ where: { id: +req.params.id } })

  res.json(article)
})

app.post('/users', async (req, res) => {
  const user = await prisma.user.create({ data: req.body })

  res.json(user)
})

app.post('/users/:id/profile', async (req, res) => {
  // 1. fetch the user
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: +req.params.id },
  })
  // 2 construct the data

  const data = {
    ...req.body,
    userId: user.id,
  }
  // 3 to create a profile
  const profile = await prisma.profile.create({ data })

  res.json(profile)
})

// Fazendo um join para trazer um user e o seu perfil
app.get('/users/:id', async (req, res) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: +req.params.id },
    include: {
      profile: true,
    },
  })

  res.json(user)

  // const users = await prisma.user.findMany({
  //   where: { profile: isNot(null) },
  //   include: { profile: true },
  // })

  // res.json(users)

  // console.log(users)
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany({
    where: { profile: { isNot: null } },
    include: {
      profile: true,
    },
  })

  res.json(users)
})

// Adicionar um artigo por user
app.post('/users/:id/articles', async (req, res) => {
  // Buscar pelo o user
  const user = await prisma.user.findUniqueOrThrow({
    where: { id: +req.params.id },
  })

  // Criar o meu payload
  const data = {
    ...req.body,
    userId: user.id,
  }
  // Inserir o meu userId e o valor do article
  const article = await prisma.article.create({ data })
  res.json(article)
})

// Retornar os artigos relacionado a um user
app.get('/users/:id/articles', async (req, res) => {
  const user = await prisma.user.findFirst({
    where: { id: +req.params.id },
    include: {
      articles: true,
      profile: true,
    },
  })

  res.json(user)
})

// Todos usuários com artigos
app.get('/users/articles', async (req, res) => {
  const users = await prisma.user.findMany({
    include: { _count: { select: { articles: truem } } },
  })

  // Pegando pelo id e state
  // const articles = await prisma.article.findMany({
  //   userId: user.id,
  //   state: 'Draft',
  // })

  const result = await prisma.user.update({
    where: { id: +req.params.id },
    data: {
      articles: {
        deleteMany: {
          state: 'DRAFT',
        },
      },
    },
  })

  res.json(users)
})

app.listen(3000, () => {
  console.log('App working!')
})
