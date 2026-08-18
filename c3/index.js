// const express = require('express')
// const app = express()
// app.get('/', (req, res) => {
//     res.send("hellooooo")
// })

// // path parameter

// app.get('/new/:id', (req, res) => {

//     console.log(req.params);
//     let { id } = req.params
//     res.send(id)
//     res.send("new pagee")
// })
// // query parameter

// app.get('/q', (req, res) => {
//     console.log(req.query);
//     res.send([req.query.firstName, req.query.lastName])
// })


// app.listen(3000, () => console.log('server running at port no 3000'))

// //  query parameter, path para


const express = require('express')
const app = express()
app.use(express.json())
app.get('/', (req, res) => {
    res.send('hello')
})
app.post('/data', (req, res) => {
    console.log(req.body);
    
    res.send("posted data");
});

app.listen(3000, () => console.log('server runningggg'))