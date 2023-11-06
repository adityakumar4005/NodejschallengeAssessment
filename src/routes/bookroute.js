const express = require('express');
const router = express.Router();
const Book = require('../model/book');
router.post('/books', async (req, res) => {


    const { title, author, summary } = req.body;
    const newBook = new Book({ title, author, summary });

    newBook.save()
        .then(savedBook => {
            res.status(201).json(savedBook);
        })

        .catch(error => {
            console.error(error);
            res.status(500).json({ error: 'Failed to create a book.' });
        });
});
// Get a list of all books (GET)
router.get('/books', async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve books.' });
    }
});

// Get details of a specific book by ID (GET)
router.get('/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve the book.' });
    }
});

// Update a book's details (PUT)
router.put('/books/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // Return the updated book
        );
        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update the book.' });
    }
});

// Delete a book (DELETE)
// Delete a book by ID
router.delete('/books/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.json(deletedBook);
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Failed to delete the book.' });
    }
});

module.exports = router;