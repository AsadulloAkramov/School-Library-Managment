const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const { Author, validate } = require('../models/author');


// Get all author route
router.get('/', async (req, res) => {
    const authors = await Author.find();
    res.render('authors', {
        authors: authors
    })
})

// Get adding new author route
router.get('/new', async (req, res) => {
    res.render('authors/new');
})

// Get author  with given id route
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const author = await Author.findById(id);

        res.render('authors/view', {
            author: author
        });
    }
    catch (ex) {
        res.render()
    }

})

// Get eidt an author page route
router.get('/edit/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const author = await Author.findById(id);
        res.render('authors/edit', {
            author: author
        })
    }
    catch (ex) {
        res.render('authors')
    }
})

//Get delete page route
router.get('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const author = await Author.findById(id);
        res.render('authors/delete', {
            author: author
        })
    }
    catch (ex) {
        res.render('authors')
    }
})

// Create new author route
router.post('/', async (req, res) => {
    let author = new Author({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        country: req.body.country
    });
    try {
        console.log(author);
        if (validate(author)) {
            console.log("Validasiyadan otdi");
            await author.save();
            res.redirect('/authors')
        }
    }
    catch {
        const { error } = validate(author);
        console.log(error.details[0].message)
        res.render('authors/new', {
            errorMessage: error.details[0].message
        });
    }
})

router.put('/edit/:id', async (req, res) => {
    console.log(req.body.firstName);
    res.redirect('/authors');
})

router.delete('/delete/:id', async (req, res) => {

    const id = req.params.id;
    try {
        const RemovedAuthor = await Author.findByIdAndRemove(id);
        console.log(RemovedAuthor);
        res.redirect('/authors');
    }
    catch (ex) {
        const errorMessage = '';
        if (!mongoose.isValidObjectId(id)) {
            errorMessage = "Author doesn't found in database";
        }
        else {
            errorMessage = "Some internal error occurred";
        }

        res.render('/authors/delete/req.params.id', {
            errorMessage: errorMessage
        })
    }

})

async function UpdateAuthor(req , res , id){
    try{
        const author = await Author.update({_id: id} ,{
            $set:{
               firstName : req.body.firstName,
               lastName : req.body.lastName,
               country: req.body.country
            }      
        });

        console.log(req.body);
        return res.redirect('/authors');
    }
    catch{
                 return res.render('/authors/edit/id');
    }
}
module.exports = router;
