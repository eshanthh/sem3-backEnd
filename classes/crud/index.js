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


// const express = require('express')
// const app = express()
// app.use(express.json())
// app.get('/', (req, res) => {
//     res.send('hello')
// })
// app.post('/data', (req, res) => {
//     console.log(req.body);

//     res.send("posted data");
// });

// app.listen(3000, () => console.log('server runningggg'))




const express = require('express');
const app = express()
let products = [
    {
        id: 1,
        name: "iPhone 15",
        category: "mobile",
        price: 69999,
        stock: 10
    },
    {
        id: 2,
        name: "Galaxy S24",
        category: "mobile",
        price: 64999,
        stock: 8
    },
    {
        id: 3,
        name: "MacBook Air",
        category: "laptop",
        price: 99999,
        stock: 5
    },
    {
        id: 4,
        name: "Dell XPS 14",
        category: "laptop",
        price: 89999,
        stock: 7
    },
    {
        id: 5,
        name: "AirPods Pro",
        category: "headphones",
        price: 24999,
        stock: 15
    },
    {
        id: 6,
        name: "Sony XM5",
        category: "headphones",
        price: 29999,
        stock: 12
    }
];


app.get('/', (req, res) => {
    res.status(200).json({ msg: products })
})
app.get('/products/:id', (req, res) => {
    let { id } = req.params
    let data = products.find((a) => {
        return a.id == id;
    })
    console.log(data);
    if (!data) {
        return res.status(404).json({ msg: "data not found" })
    }
    res.status(200).json({ msg: data })

})
app.get('/search', (req, res) => {
    let { category } = req.query
    let data = products.filter((a) => {
        return a.category == category;
    })
    console.log(data);

    if (!data) {
        return res.status(404).json({ msg: "data not found" })
    }
    res.status(200).json({ msg: data })
})
app.use(express.json())
app.post('/products', (req, res) => {
    console.log(req.body);
    let obj = {
        ...req.body
    }
    products.push(obj)

    res.send("doneee")

})

app.put('/products/:id',(req,res)=>{
    let {id} = req.params
    console.log(req.body);

    let {stock} = req.body
    let data = products.find((a)=>{
        return a.id==id
    })

    data.stock=stock
    res.send(products)

})

app.listen(3000, () => {
    console.log('server running');

})