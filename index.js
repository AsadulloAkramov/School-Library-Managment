if (process.env.NODE_ENV !== 'production') {
    const dotenv = require('dotenv');
    dotenv.config();
}

const express = require('express');
const mongoose = require('mongoose');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const path = require('path');

// Routes
const indexRoute = require('./routes/index');
const contactRoute = require('./routes/contact');
const authorRoute  = require('./routes/authors');
const bookRoute = require('./routes/books');
const app = express();
// Connection to mongoose
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true , useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', error => console.error(error))
db.once('open', () => console.log("Connected to mongoose"));




// General settings our apps
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');

//Middleware
app.use(expressLayouts);
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(bodyParser.json());

app.use('/', indexRoute);
app.use('/contact', contactRoute);
app.use('/authors' , authorRoute);
app.use('/books' , bookRoute);


//Listen port
app.listen(process.env.PORT || 3000)