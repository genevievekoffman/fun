var mongoose = require('mongoose');
mongoose.connect("mongodb+srv://genkoffman:LkeKA9ePae8j1tD8@cluster0-iv907.gcp.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, userUnifiedTopology: true});

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

var db = mongoose.connection;
db.on('error',console.error.bind(console, "connection error: "));
db.once('open', () => {
    console.log("we are connected!");
})

const recipeSchema = new mongoose.Schema({
    name: String,
    myRating: Number,
    coverPhoto: String,
    ingredients: [String],
    instructions: [String],
    meal: {
        type: String,
        enum: ['breakfast','lunch', 'dinner', 'dessert', 'other']
    },
    favorite: Boolean
})

//collection 
const Recipes = mongoose.model('recipes', recipeSchema);

var chocChipCookies = new Recipes({
    name: "Chocolate Chip Cookies",
    myRating: 5,
    coverPhoto: "asdf",
    ingredients: ["2 eggs", "1 stick of butter", "chocolate chips", "5 oz brown sugar"],
    
})