const mongoose = require('mongoose')
const User = require('../models/user')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  likes: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

// Query Middleware
blogSchema.post('findOneAndDelete', async (blog) => {
  const user = await User.findById(blog.user)
  user.blogs = user.blogs.filter((blogId) => blogId.toString() !== blog.id)
  await user.save()
})

module.exports = mongoose.model('Blog', blogSchema)
