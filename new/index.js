const express = require('express')
const app = express()
const signup = require('./routers/SignUp')
const mongoose = require('mongoose')
app.use(express.json())
app.use('/api', signup)


mongoose.connect('mongodb://127.0.0.1:27017/demo').then(()=>{
    console.log("dbb.....");
    
})

 

app.listen(3000, () => {
    console.log('server');

})