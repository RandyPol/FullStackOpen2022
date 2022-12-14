import React from 'react'

const NewBlog = ({ createBlog }) => {
  const [newBlog, setNewBlog] = React.useState({
    title: '',
    author: '',
    url: '',
  })

  const handleChangeBlog = (e) => {
    const { name, value } = e.target
    setNewBlog((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleNewBlog = async () => {
    createBlog(newBlog)
    setNewBlog({
      title: '',
      author: '',
      url: '',
    })
  }

  return (
    <div>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          name="title"
          id="title"
          value={newBlog.title}
          onChange={handleChangeBlog}
        />
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input
          type="text"
          name="author"
          id="author"
          value={newBlog.author}
          onChange={handleChangeBlog}
        />
      </div>
      <div>
        <label htmlFor="url">Url:</label>
        <input
          type="text"
          name="url"
          id="url"
          value={newBlog.url}
          onChange={handleChangeBlog}
        />
      </div>
      <button onClick={handleNewBlog}>Create</button>
    </div>
  )
}

export default NewBlog
