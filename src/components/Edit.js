import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import useFetch from '../useFetch'


const Edit = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('')
  const history = useHistory()
  const { id } = useParams()
  const {
    data: blog,
    isPending,
  } = useFetch('https://final-react-blog-be.web.app/blogs/' + id)

  useEffect(() => {
      console.log(blog);
      if(blog) {
          setTitle(blog.title);
          setBody(blog.body);
          setCategory(blog.category);
      }
  }, [blog])

  const handleSubmit = (e) => {
    e.preventDefault()
    fetch('https://final-react-blog-be.web.app/blogs/' + blog.id, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, body, category }),
    }).then(() => {
      console.log('blog edited')
      history.push('/')
    })
  }

  return (
    <div className="create">
      <h2>Edit Blog</h2>
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
        <label>Blog category</label>
        <select value={category} onChange={(e) =>{
          setCategory(e.target.value)
          console.log(e.target.value)
          }}>
          <option value="Resources">Resources</option>
          <option value="Jobs">Jobs</option>
          <option value="Education">Education</option>
        </select>
        {!isPending && <button>Edit blog</button>}
        {isPending && <button disabled>Adding blog...</button>}
      </form>
    </div>
  )
}

export default Edit
