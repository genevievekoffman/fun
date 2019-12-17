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
 

const gamesSchema = new mongoose.Schema({
    title: String,
    selectedImage: String,
    imgs: [String],
    publisher: String,
    yearOfRelease: Number,
    ratings: Number,
    audience: {
        type: String,
        enum: ['e','t','m']
    },
    numberOfPlayers: {
        type: String,
        enum: ['single','multi']
    },
    platforms:[String],
    genre: String,
    price: Number,
    size: Number
});

//collection
const Games = mongoose.model('games', gamesSchema)

var Skyrim = new Games({
    title: "Skyrim",
    selectedImage: "https://s3.gaming-cdn.com/images/products/146/orig/the-elder-scrolls-v-skyrim-cover.jpg",
    imgs: ["https://elderscrolls.bethesda.net/assets/imgs/meta/skyrim-facebook.jpg", "https://i.ytimg.com/vi/KbdryZ_aAec/maxresdefault.jpg", "https://specials-images.forbesimg.com/imageserve/5df3347725ab5d0007ce566c/960x0.jpg?fit=scale"],
    publisher: 'Jeremy Soule',
    yearOfRelease: 2011,
    ratings: 4.5,
    audience: 'm',
    numberOfPlayers: 'multi',
    platforms: ['PlayStation','Xbox', 'PC'],
    genre: "action role-playing game",
    price: 170,
    size: 6
});
 

Skyrim.save((err, Skyrim) => {
    if(err) return console.error(err);
    console.log('Skyrim was saved')
})

var Halo = new Games({
    title: "Halo 5",
    selectedImage: "https://media.gamestop.com/i/gamestop/10119595/Halo-5-Guardians",
    imgs: ["https://www.allkeyshop.com/blog/wp-content/uploads/halo-5-guardians-800x600-3.jpg", "https://www.hrkgame.com/media/screens/halo-5-guardians/.thumbnails/041883.jpg/041883-800x500.jpg"],
    publisher: 'Tim Longo',
    yearOfRelease: 2015,
    ratings: 4,
    audience: 'm',
    numberOfPlayers: 'single',
    platforms: ['PlayStation','Xbox', 'PC'],
    genre: "first person shooter video game",
    price: 170,
    size: 6
});
 

Halo.save((err, Halo) => {
    if(err) return console.error(err);
    console.log('Halo was saved')
})

 

 

app.post('/getByName', (req, res) => {
    let name = req.body.name;
    if(name){
        Games.find({title:name}, (err, docs)=>{
            res.send({'names': docs})
        })
    } else {
        res.send({error:'didnt find any game by that name'})
    }
 
})


app.post('/getByRating', (req, res) => {
    let rating = req.body.rating;
    if(rating){
        Games.find({ratings:rating}, (err, docs)=>{
            res.send({'rating': docs})
        })
    } else {
        res.send({error:'didnt find any game with that rating'})
    }
 
})

app.post('/getByAudience', (req, res) => {
    let audience = req.body.audience;
    if(audience){
        Games.find({audience:audience}, (err, docs)=>{
            res.send({'audience': docs})
        })
    } else {
        res.send({error:'didnt find any games with that audience'})
    }
 
})
 
 
let port = process.env.PORT || 3001;

app.listen(port,function () {
    console.log("server is listening on port", port);
});