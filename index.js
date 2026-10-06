const exprees=require('express')
const otp = require('./otp')

const app = exprees ()

app.use(exprees.json())

app.use('/api',otp)
app.listen(3000,()=>{
    console.log('serverrr');
    
})