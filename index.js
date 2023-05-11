const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

let books = [];
let nextId = 1;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//Requesting get method for all books
app.get('/books', (req, res) => {
    res.json(books);
});

//post method

app.post('/books', (req, res) => {
    const { title, author, publishedDate } = req.body;
    if (!title || !author) {
        res.status(400).json({ error: 'Title and author are required.' });
        return;
    }
    const book = { id: nextId++, title, author, publishedDate };
    books.push(book);
    res.status(201).json(book);
});

//Delete method

app.delete('/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = books.findIndex(book => book.id === id);
    if (index === -1) {
        res.status(404).json({ error: `Book with ID ${id} not found.` });
        return;
    }
    books.splice(index, 1);
    res.json({ message: `Book with ID ${id} successfully deleted.` });
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}.`));