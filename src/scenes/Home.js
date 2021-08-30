import BlogList from "../components/BlogList"
import useFetch from "../useFetch";

const Home = () => {
    const { data: blogs, isPending, error} =useFetch('https://final-react-blog-be.web.app/blogs/')
  
    
  
    return (
      <div className="home">
          { error && <div>{ error }</div> }
          { isPending && <div>Loading...</div> }
        {blogs && <BlogList blogs={blogs} title ="Thanks for joining our community!"/>}
      </div>
    );
  }
   
  export default Home;
  