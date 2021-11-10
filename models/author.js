const mongoose = require('mongoose');
const Joi = require('joi');


const authorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    }
});

function validateAuthor(author) {
    const authorValidateSchema = Joi.object({
        firstName: Joi.string().required().min(3).max(50),
        lastName: Joi.string().required().min(3).max(50),
        country: Joi.string().required().min(3).max(50),
    });
    return authorValidateSchema.validate(author);
}

const Author = mongoose.model("Author", authorSchema);
module.exports.Author = Author;
module.exports.authorSchema = authorSchema;
module.exports.validate = validateAuthor;

