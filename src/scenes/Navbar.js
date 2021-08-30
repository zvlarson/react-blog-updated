import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import 'firebase/auth'
import firebase from 'firebase'
import { firebaseConfig } from '../config'
import { useContext } from 'react'
import { UserContext } from '../App'


const Navbar = () => {
    const history = useHistory()

    const { user } = useContext(UserContext)

    const signOut = () => {
        if (!firebase.apps.length) {
            firebase.initializeApp(firebaseConfig)
          }
        firebase.auth().signOut()
        .then(() => {
            console.log('signed out')
        })
        .then(() => {
            history.push('/signin')
        })
        .catch(err =>  console.log(err))
    }


    return (
        <nav className="navbar">
            <h1>NDNetwork</h1>
            <div className="links">
                {user ? (
                    <>
                <Link to="/">Home</Link>
                <Link to="/create">Add Blog</Link>
                <Link to="/signOut" onClick={() => signOut(window.location.reload(false))} >Sign Out </Link>
                
                    </>
                ):(
                    <>
                <Link to="/signUp">Sign Up</Link>
                <Link to="/signin">Sign In</Link>
                </>
                )}
            </div>
        </nav>
    )
}

export default Navbar