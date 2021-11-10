const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Author } = require('../models/author');


// Get all books route
router.get('/', async (req, res) => {
    res.render('books/index');
})
// Get adding new book route
router.get('/new', async (req, res) => {
    res.render('books/new');
})

// Create new book route
router.post('/', async (req, res) => {

})



module.exports = router;