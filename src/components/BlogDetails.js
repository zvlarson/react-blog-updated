import { useHistory, useParams } from 'react-router-dom'
import useFetch from '../useFetch'

const BlogDetails = () => {
  const history = useHistory();
  const { id } = useParams()
  const {
    data: blog,
    error,
    isPending,
  } = useFetch('https://final-react-blog-be.web.app/blogs/' + id)

  const deleteBlog = () => {
    fetch('https://final-react-blog-be.web.app/blogs/' + blog.id, {
      method: 'DELETE',
    }).then(() => {
      history.push('/')
    })
  }


  return (
    <div className="blog-details">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <p>Category: {blog.category}</p>
          <img alt={blog.title} className="image" src={blog.pic} />
          <div>{blog.body}</div>
          <button onClick={() => deleteBlog()}>Delete</button>{' '}
          <button onClick={() => history.push('/edit/' + blog.id)}>Edit</button>
        </article>
      )}
    </div>
  )
}
export default BlogDetails
