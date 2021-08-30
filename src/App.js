import firebase from 'firebase'
import 'firebase/auth'
import { firebaseConfig } from './config'

import { useEffect, useState, createContext } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import 'antd/dist/antd.css'
import { Layout } from 'antd'

import Navbar from './scenes/Navbar'
import Home from './scenes/Home'
import Create from './components/Create'
import BlogDetails from './components/BlogDetails'
import NotFound from './components/NotFound'
import SignUp from './scenes/SignUp'
import Edit from './components/Edit'
import SignIn from './scenes/Login'


const { Header, Content } = Layout

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const UserContext = createContext(null)

function App() {
  const [user, setUser] = useState(null)
  const fbUser = firebase.auth().currentUser
  useEffect(() => {
    setUser(firebase.auth().currentUser)
  }, [fbUser])
  return (
    // <div className="entire" style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row'}}>
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Layout>
          <div className="App">
            <Header style={{height: "100px"}}>
              <Navbar  />
            </Header>
            <Content>
              <div className="content">
                <Switch>
                  <Route exact path="/signin">
                    <SignIn setUser={setUser} />
                  </Route>
                  <Route exact path="/signup">
                    <SignUp setUser={setUser} />
                  </Route>
                  <Route exact path="/">
                    <Home user={user} />
                  </Route>
                  <Route exact path="/create">
                    <Create />
                  </Route>
                  <Route exact path="/edit/:id">
                    <Edit />
                  </Route>
                  <Route exact path="/blogs/:id">
                    <BlogDetails />
                  </Route>
                  <Route path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </div>
            </Content>
          </div>
        </Layout>
      </Router>
    </UserContext.Provider>
    // </div>
  )
}

export default App
