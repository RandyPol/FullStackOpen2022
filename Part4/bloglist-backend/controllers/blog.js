const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

// Route to receive all blogs
blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  res.json(blogs)
})

// Route to create a new blog
blogsRouter.post('/', async (req, res) => {
  const body = req.body
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if (!body.title || !body.url) {
    res.status(400).json({ erro: 'Missing properties' })
    return
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

// Route to delete a blog
blogsRouter.delete('/:id', async (req, res) => {
  const blogID = req.params.id
  const blogFound = await Blog.findById(blogID)

  if (!blogFound) {
    res.status(404).json({ erro: `The blog post id#${blogID} don't exits` })
  }
  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' })
  }

  if (blogFound.user.toString() === decodedToken.id) {
    await Blog.findByIdAndRemove(blogID)
    res.status(204).end()
  }
  return res
    .status(400)
    .json({ error: 'You are not authorized to delete this blog' })
})
module.exports = blogsRouter

// Route to update a blog
blogsRouter.put('/:id', async (req, res) => {
  const blogID = req.params.id
  const { likes } = req.body

  // const currentBlog = await Blog.findById(blogID)
  const updatedBlog = await Blog.findByIdAndUpdate(
    blogID,
    {
      likes,
    },
    { runValidators: true, new: true }
  )
  res.status(204).json(updatedBlog)
})
module.exports = blogsRouter
