import { useState } from 'react'
import { useHistory } from 'react-router-dom'


const Create = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [author, setAuthor] = useState('')
  const [pic, setPic] = useState('')
  const [category, setCategory] = useState('Resources')
  const [isPending, setIsPending] = useState(false)
  const history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    const blog = { title, body, author, pic, category }

    setIsPending(true)
    fetch('https://final-react-blog-be.web.app/blogs/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(blog),
    }).then(() => {
      console.log('new blog added')
      setIsPending(false)
      history.push('/')
    })
  }

  return (
    <div className="create">
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <input value={author} onChange={(e) => setAuthor(e.target.value)} />
        <label>Blog Picture:</label>
        <input value={pic} onChange={(e) => setPic(e.target.value)} />
        <label>Blog category</label>
        <select value={category} onChange={(e) =>{
          setCategory(e.target.value)
          console.log(e.target.value)
          }}>
          <option value="Resources">Resources</option>
          <option value="Jobs">Jobs</option>
          <option value="Education">Education</option>
        </select>
        {!isPending && <button>Add blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
    </div>
  )
}

export default Create
