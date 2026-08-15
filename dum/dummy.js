const express = require('express')
const app = express()

app.get('/',(req,res)=>{
    res.end('namaste')
})
app.listen(4000, () => console.log(`running at port no 4000`)
)