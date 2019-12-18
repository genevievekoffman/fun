var mongoose = require('mongoose');
mongoose.connect("mongodb+srv://genkoffman:LkeKA9ePae8j1tD8@cluster0-iv907.gcp.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, userUnifiedTopology: true})

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
    title: String,
    coverImg: String,
    stars: Number,
    ingredients: [String],
    meal: {
        type: String,
        enum: ['breakfast','lunch', 'dinner', 'snacks', 'dessert']
    },
    instructions:[String]
});

//collection
const Recipes = mongoose.model('recipes', recipeSchema)

var chocChipCookie = new Recipes({
    title: "Chocolate Chip Cookies",
    coverImg: "https://www.handletheheat.com/wp-content/uploads/2018/02/BAKERY-STYLE-CHOCOLATE-CHIP-COOKIES-9.jpg",
    stars: 9.5,
    ingredients: ["1 cup butter", "1 cup white sugar", "1 cup brown sugar", "2 eggs", 
    "2 tspn vanilla", "1 tspn baking soda", "3 cups flour", "1 bag of chocolate chips"],
    meal: 'dessert',
    instructions: ['Mix the butter and sugars in a big bowl','Slowly add in the eggs and vanilla', 'Add the baking soda and flour',
    "mix in chocolate chips", "put in fridge for atleast 30 minutes", "cook for 12 minutes at 350 deg"]
});
 

chocChipCookie.save((err, chocChipCookie) => {
    if(err) return console.error(err);
    console.log('chocChipCookie was saved')
})

var chocCake = new Recipes({
    title: "Chocolate Cake",
    coverImg: "https://tastesbetterfromscratch.com/wp-content/uploads/2010/06/Hersheys-Perfectly-Chocolate-Chocolate-Cake-13.jpg",
    stars: 9,
    ingredients: ["2 cups flour", "2 cups sugar", "3/4 cup cocoa powder", "2 large eggs", 
    "1 tspn espresso powder", "2 tspn baking powder", "1 cup buttermilk", "1 cup boiling water",
    "2 tspn vanilla extract", "1/2 cup canola oil"],
    meal: 'dessert',
    instructions: ['Add flour, sugar, cocoa, baking powder, and espresso powder to large bowl. Whisk through until combined well.',
    'Add milk, oil, eggs, and vanilla to flour mixture and mix together on medium speed. Reduce speed and carefully add water to batter.',
    "Pour cake batter into cake pans. Bake for 30-35 minutes at 350º F."]
});

chocCake.save((err, chocCake) => {
    if(err) return console.error(err);
    console.log('chocCake was saved')
})

app.post('/getByName', (req, res) => {
    let name = req.body.name;
    if(name){
        Recipes.find({title:name}, (err, docs)=>{
            res.send({'names': docs})
        })
    } else {
        res.send({error:'didnt find any recipes by that name'})
    }
 
})


app.post('/getByStars', (req, res) => {
    let stars = req.body.stars;
    if(stars){
        Recipes.find({stars:stars}, (err, docs)=>{
            res.send({'stars': docs})
        })
    } else {
        res.send({error:'didnt find any recipes with those stars'})
    }
 
})

app.post('/getByMeal', (req, res) => {
    let meal = req.body.meal;
    if(meal){
        Recipes.find({meal:meal}, (err, docs)=>{
            res.send({'meal': docs})
        })
    } else {
        res.send({error:'didnt find any recipes with that meal'})
    }
 
})
 
 
let port = process.env.PORT || 3001;

app.listen(port,function () {
    console.log("server is listening on port", port);
});


 

 




// const gamesSchema = new mongoose.Schema({
//     title: String,
//     selectedImage: String,
//     imgs: [String],
//     publisher: String,
//     yearOfRelease: Number,
//     ratings: Number,
//     audience: {
//         type: String,
//         enum: ['e','t','m']
//     },
//     numberOfPlayers: {
//         type: String,
//         enum: ['single','multi']
//     },
//     platforms:[String],
//     genre: String,
//     price: Number,
//     size: Number
// });

// //collection
// const Games = mongoose.model('games', gamesSchema)

// var Skyrim = new Games({
//     title: "Skyrim",
//     selectedImage: "https://s3.gaming-cdn.com/images/products/146/orig/the-elder-scrolls-v-skyrim-cover.jpg",
//     imgs: ["https://elderscrolls.bethesda.net/assets/imgs/meta/skyrim-facebook.jpg", "https://i.ytimg.com/vi/KbdryZ_aAec/maxresdefault.jpg", "https://specials-images.forbesimg.com/imageserve/5df3347725ab5d0007ce566c/960x0.jpg?fit=scale"],
//     publisher: 'Jeremy Soule',
//     yearOfRelease: 2011,
//     ratings: 4.5,
//     audience: 'm',
//     numberOfPlayers: 'multi',
//     platforms: ['PlayStation','Xbox', 'PC'],
//     genre: "action role-playing game",
//     price: 170,
//     size: 6
// });
 

// Skyrim.save((err, Skyrim) => {
//     if(err) return console.error(err);
//     console.log('Skyrim was saved')
// })

// var Halo = new Games({
//     title: "Halo 5",
//     selectedImage: "https://media.gamestop.com/i/gamestop/10119595/Halo-5-Guardians",
//     imgs: ["https://www.allkeyshop.com/blog/wp-content/uploads/halo-5-guardians-800x600-3.jpg", "https://www.hrkgame.com/media/screens/halo-5-guardians/.thumbnails/041883.jpg/041883-800x500.jpg"],
//     publisher: 'Tim Longo',
//     yearOfRelease: 2015,
//     ratings: 4,
//     audience: 'm',
//     numberOfPlayers: 'single',
//     platforms: ['PlayStation','Xbox', 'PC'],
//     genre: "first person shooter video game",
//     price: 170,
//     size: 6
// });
 

// Halo.save((err, Halo) => {
//     if(err) return console.error(err);
//     console.log('Halo was saved')
// })

 