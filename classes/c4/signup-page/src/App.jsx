import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
  let [data, SetData] = useState({
    name: "",
    email: "",
    passWord: ""
  })

  let [loginData, setLoginData] = useState({
    email: "",
    passWord: ""
  })

  function fun1(e) {
    console.log(e.target);
    let { name, value } = e.target
    SetData({ ...data, [name]: value })
    console.log(data, "datata");

  }
  function loginInput(e) {
    let { name, value } = e.target
    setLoginData({
      ...loginData,
      [name]: value
    })
  }


  async function done() {
    let apiR = await axios.post("http://localhost:3000/signUp", data)
    console.log(apiR, "heheheeh");
  }
  async function login() {
    let apiR = await axios.post("http://localhost:3000/login", loginData)
    console.log(apiR, "hehe login");

  }


  return (
    <div>
      <h1>Signupp</h1>
      <input name='name' value={data.name} placeholder='Enter your name' onChange={fun1} />
      <br></br>
      <br></br>

      <input name='email' value={data.email} placeholder='Enter your email' onChange={fun1} />
      <br></br>
      <br></br>

      <input name='passWord' value={data.passWord} placeholder='Enter your passWord' onChange={fun1} />
      <br></br>
      <br></br>
      <button onClick={done}>signup</button>
      <h1>Loginn</h1>
      <input name="email" value={loginData.email} placeholder='enter email to login' onChange={loginInput} />
      <br />
      <br />
      <input name="passWord" value={loginData.passWord} placeholder='enter pass to login' onChange={loginInput} />
<br />
<br />
      <button onClick={login}> loginn</button>
    </div>

  )
}

export default App
