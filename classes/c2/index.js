// let http=require('http')
// let server=http.createServer((req,res)=>{
//     // console.log(req.url,"bhhh");
//     // res.write("byee")
//     // res.end('hello')
//     if(req.url=='/'){
//         res.end('hello')
//     }
//     else if(req.url=='/about'){
//         res.end('about')
//     }
//     else{
//         res.end('not found')
//     }
// })
// server.listen(3000,()=>{
//     console.log("server starttt");

// })

const express = require('express')

let app = express()

app.use((req, res, next) => {
    console.log('wont let you ');
    next()
})
app.use((req,res,next)=>{
    console.log("seconddd onee");
    next()
})


app.get('/', (req, res) => {
    res.send("main page")
})
app.post('/', (req, res) => {
    res.send("post dataaaa")
})
app.get('/about', (req, res) => {
    res.send("about page")
})
app.listen(3000, () => {
    console.log('helloo');

})