// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1
}

// Function to find the all post likes
const totalLikes = (blogs) => {
  return blogs.reduce((sum, post) => {
    return sum + post.likes
  }, 0)
}

// Function to find the most favorite post
const favoriteBlog = (blogs) => {
  return blogs.reduce((previousValue, currentValue) =>
    previousValue.likes <= currentValue.likes ? currentValue : previousValue
  )
}

// Author with most blogs
const mostBlogs = (listBlogs) => {
  const authorMostBlogs = listBlogs.reduce((authors, nextBlog) => {
    authors[nextBlog['author']] = authors[nextBlog['author']] || 0
    authors[nextBlog['author']] += 1
    return authors
  }, {})
  const [author, blogs] = Object.entries(authorMostBlogs).reduce(
    (startValue, currentValue) =>
      startValue[1] >= currentValue[1] ? startValue : currentValue
  )
  return {
    author,
    blogs,
  }
}

// Author with most likes
const mostLikes = (listBlogs) => {
  const authorMostLikes = listBlogs.reduce((authors, nextBlog) => {
    authors[nextBlog['author']] = authors[nextBlog['author']] || 0
    authors[nextBlog['author']] += nextBlog['likes']
    return authors
  }, {})
  const [author, likes] = Object.entries(authorMostLikes).reduce(
    (startValue, currentValue) =>
      startValue[1] >= currentValue[1] ? startValue : currentValue
  )
  return {
    author,
    likes,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
