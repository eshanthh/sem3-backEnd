// const http = require('http')
// const server = http.createServer((req, res) => {
//     console.log(req.url);
//     console.log(req.method);
//     res.end("welcome to server")
// })
// server.listen(3000, () => {
//     console.log('server runninnng');
// })

// const http = require('http')
// const app = http.createServer((req, res) => {
//     if (req.url == '/') res.end("home")
//     else if (req.url == '/products') res.end('products')
//     else if (req.url == '/login') res.end('login')
//     else res.end("error 404 not valid")
// })

// app.listen(3000, () => {
//     console.log("server running");
// })


// const express = require('express')
// const app = express()

// app.get('/',(req,res)=>{
//     res.send("home page")
// })
// app.get('/products',(req,res)=>{
//     res.send('products page')
// })
// app.get('/login',(req,res)=>{
//     res.send('login page')
// })



// app.listen(3000,()=>{
//     console.log('server running');

// })



const express = require('express')
const app = express()

app.use((req, res, next) => {
    console.log(req.url);
    console.log(req.method);
    next();
});
app.get('/', (req, res) => {
    console.log(req.url);
    res.send("home page")
})
app.get('/products', (req, res) => {
    res.send('products page')
})
app.get('/login', (req, res) => {
    res.send('login page')
})

app.listen(3000, () => console.log('server running'))