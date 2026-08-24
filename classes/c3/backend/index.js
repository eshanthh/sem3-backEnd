let express = require("express")
let app = express()
let cors = require('cors')
app.use(cors())
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


// products[0].id=10
app.use(express.json())


app.get('/', (req, res) => {
    res.send(products)
    // res.send("hehe")


})
app.get('/product/:id', (req, res) => {
    let { id } = req.params
    let data = products.find((a) => {
        return a.id === Number(id)

    })
    if (!data) {
        return res.status(404).json({ msg: "not founddddddddd" })
    }
    res.status(200).json({ msg: data })
    // console.log(data,"ididid");



})


// if(![]){
//    console.log("hehehe");

// }
app.get('/search', (req, res) => {
    let { category } = req.query
    // console.log(category,"heheeh");

    let data = products.filter((a) => {
        return a.category == category
    })
    // console.log(data,"hehe");
    if (!data) {
        return res.status(404).json({ msg: "not founddddddddd" })

    }
    res.status(200).json({ msg: data })



})
app.post('/product', (req, res) => {
    console.log(req.body);
    let obj = {
        ...req.body

    }
    products.push(obj)
    res.send("doneee")




})
app.put('/product/:id', (req, res) => {
    let { id } = req.params;
    console.log(id, "hehe");
    console.log(req.body, "updatedddddd");
    let { stock } = req.body

    let data = products.find((a) => {
        // console.log(a,"aa");
        console.log(a.id, "hehe");


        return a.id === Number(id)

    })
    console.log(data, "datata");
    data.stock = stock
    res.json({ msg: "done", data })




})


app.listen(4000, () => {
    console.log("server.....");


})