import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [data, setData] = useState({
    name: '',
    email: '',
    passWord: '',
  })

  function handleChange(event) {
    const { name, value } = event.target
    setData({ ...data, [name]: value })
  }

  async function handleSubmit(event) {
    event.preventDefault()

    try {
      const response = await axios.post('http://localhost:3000/signUp', data)
      console.log(response, 'signup response')
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message)
    }
  }

  return (
    <main>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" value={data.name} placeholder="Enter your name" onChange={handleChange} />
        <br />
        <br />
        <input name="email" value={data.email} placeholder="Enter your email" onChange={handleChange} />
        <br />
        <br />
        <input name="passWord" type="password" value={data.passWord} placeholder="Enter your password" onChange={handleChange} />
        <br />
        <br />
        <button type="submit">Signup</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </main>
  )
}

export default Signup