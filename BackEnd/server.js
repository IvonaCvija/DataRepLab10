const express = require('express')
const app = express()
const port = 4000;
const cors = require('cors');

//server.js
//add just under import section at the top of server,js
// Serve the static files from the React app
const path = require('path');
app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

// app.use(cors());
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     res.header("Access-Control-Allow-Headers",
//         "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    // username:password
    await mongoose.connect('mongodb+srv://user:user2023@cluster0.1kojhqr.mongodb.net/?retryWrites=true&w=majority');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled, 
}

const bookSchema = new mongoose.Schema({
    title: String,
    cover: String,
    author: String
})

app.delete('/api/book/:id', async (req, res) => {
    console.log("Delete: " + req.params.id)

    let book = await bookModel.findByIdAndDelete(req.params.id);
    res.send(book);
})

const bookModel = mongoose.model(`books`, bookSchema)

//updating existing data using id
app.put('/api/book/:id', async (req, res) => {

    console.log("Update: " + req.params.id);

    //await so it changes it only after finding the book
    let book = await bookModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.send(book);
})

app.post('/api/book', (req, res) => {
    console.log(req.body);
    bookModel.create({
        title: req.body.title,
        cover: req.body.cover,
        author: req.body.author
    })
        //res.send("Data Received!");
        .then(() => { res.send("Book created") })
        .catch(() => { res.send("Book not created") })
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get(`/api/book/:id`, async (req, res) => {
    console.log(req.params.id);

    let book = await bookModel.findById({ _id: req.params.id })
    res.send(book);
})

app.get('/api/books', async (req, res) => {

    let books = await bookModel.find({});
    res.json(books);
})

//add at the bottom just over app.listen
// Handles any requests that don't match the ones above
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'));
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})