import React, { useState } from 'react'
import axios from 'axios'

const App = () => {
let [data,SetData]=  useState({
  name:"",
  email:"",
  passWord:""
})

function fun1(e){
  console.log(e.target);
  let {name,value}=    e.target
  SetData({...data,[name]:value})
  console.log(data,"datata");
  
  

}

  async  function done(){
  let apiR= await   axios.post("http://localhost:3000/signUp",data)
  console.log(apiR,"heheheeh");
  



}


  return (
    <div>
      <input name='name'  value={data.name} placeholder='Enter your name' onChange={fun1}/>
      <br></br>
      <br></br>

      <input name='email' value={data.email} placeholder='Enter your email' onChange={fun1}/>
      <br></br>
      <br></br>

      <input name='passWord' value={data.passWord} placeholder='Enter your passWord' onChange={fun1}/>
      <br></br>
      <br></br>
      <button onClick={done}>add</button>

    </div>
  )
}

export default App
