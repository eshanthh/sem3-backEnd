import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const App = () => {
  let [init, setInit] = useState([])
  useEffect(() => {
    async function api() {
      let res = await axios.get('http://localhost:4000')
      console.log(res.data);
      setInit(res.data)

      
      
    }
    api()
  }, [])
  return (
    <div>app
      {
        init.map((val) => {
          return (
            <>
              <li key={val.id}>
                <h2>{val.id}</h2>
                <h2>{val.name}</h2>
              </li>
            </>
          )
        })
      }
    </div>

  )
}

export default App