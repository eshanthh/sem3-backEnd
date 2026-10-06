import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    passWord: '',
  })

  function handleChange(event) {
    const { name, value } = event.target
    setLoginData({ ...loginData, [name]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const response = await axios.post('http://localhost:3000/login', loginData)
      console.log(response, 'login response')
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message)
    }
  }

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" value={loginData.email} placeholder="Enter your email" onChange={handleChange} />
        <br />
        <br />
        <input name="passWord" type="password" value={loginData.passWord} placeholder="Enter your password" onChange={handleChange} />
        <br />
        <br />
        <Link to="/reset">Forgot password?</Link>
        <br />
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        Need an account? <Link to="/signup">Signup</Link>
      </p>
    </main>
  )
}

export default Login