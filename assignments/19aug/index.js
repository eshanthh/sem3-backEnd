

const express = require("express");
const app = express();
let books = [
    { id: 1, title: "Atomic Habits", author: "James Clear", genre: "self-help", price: 499 },
    { id: 2, title: "Deep Work", author: "Cal Newport", genre: "self-help", price: 450 },
    { id: 3, title: "1984", author: "George Orwell", genre: "fiction", price: 350 },
    { id: 4, title: "Sapiens", author: "Yuval Noah Harari", genre: "history", price: 599 }
];

app.get('/books',(req,res)=>{
    res.status(200).json({books})
})

app.get('/books/:id',(req,res)=>{
    let {id} = req.params
    let book = books.find((a)=> a.id==id)
    if(book) res.status(200).json(book)
    else res.status(404).json({msg:"errrorrr"})
})

app.get('/search',(req,res)=>{
    let {genre} = req.query
    let data= books.filter((a)=>{
        return a.genre==genre
    })
    res.send(data)
})

app.use(express.json());

app.post('/books', (req, res) => {
    let up = req.body;
    books.push(up);
    res.status(201).json({ message: "Book added", book: up });
})

app.put('/books/:id',(req,res)=>{
    let {id} = req.params
    let reqq=books.find((a)=>a.id==id)
    reqq.price=req.body.price
    res.send(reqq)
})

app.delete('/books/:id',(req,res)=>{
    let {id} = req.params
    let reqq=books.find((a)=>a.id==id)
    books=books.filter((a)=>a.id!=id)
    res.send(reqq)
})

app.listen(3000, () => console.log('server running'))