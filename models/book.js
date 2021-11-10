const mongoose = require('mongoose');
const Joi = require('joi');
const { Author, authorSchema } = require('./author');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    publishedAt: {
        type: Date,
        required: true,
    },
    pageCount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    },
    coverImageName: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    author: {
        type: authorSchemas
    }
})

function validateBook(book) {
    const bookValidateSchema = Joi.object({
        title: Joi.string().required().min(3).max(50),
        description: Joi.string().required().min(3).max(50),
        coverImageName: Joi.string().required().min(3).max(50),
        pageCount: Joi.number().required(),
        publishedAt: Joi.date().required(),
        author: Joi.array().items(authorSchema)
    });

    return bookValidateSchema.validate(book);
}


const Book = mongoose.model("Book", bookSchema);

module.exports.Book = Book;
module.exports.validate = validateBook;