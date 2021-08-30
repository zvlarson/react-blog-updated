import { useHistory } from 'react-router-dom'
import firebase from 'firebase'
import 'firebase/auth'
import { Checkbox, Form, Input, Button } from 'antd'
import { firebaseConfig } from '../config'

function Login({ setUser }) {
  const history = useHistory()
  
  const handleLogin = ({ email, password }) => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((results) => {
        setUser(results.user)
        history.push('/')
      })
      .catch((err) => alert(err.message))
  }
  return (
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={handleLogin}
    >
      <Form.Item
        label="Email" name="email"
        rules={[ { required: true, message: 'Please enter your email' },
        { type: 'email', message: 'Please enter a valid email' } ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
       label="Password" name="password" rules={[ { required: true, message: 'Please enter your password' } ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit" onClick={(e) => handleLogin(e)}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

export default Login

