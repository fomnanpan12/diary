const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const Diary = require('./model/diary');
const methodOverride = require("method-override");

const PORT = 5000;

const app = express();
app.set("view engine","ejs");
app.use(express.static(__dirname + '/public/'));
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({extended: true})); //Parse URL-encoded bodies

// Parses the text as url encoded data
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(methodOverride("_method"));


mongoose.connect(
    process.env.DATABASE_URL,
    { useNewUrlParser: true, useUnifiedTopology: true},
);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});



app.get('/', (req,res) => {
    
    Diary.find({}, function (err, diaries) {
        if (err) {
          console.log(err);
        } else {
          res.render("index", { diaries: diaries });
        }
    }).sort({ _id: -1 });
});

app.get('/add', (req, res) => {
    
    res.render('add.ejs')
});

app.post('/', (req, res, next) => {
    
    var addDiary = new Diary({
        email : req.body.email,
        dlog : req.body.dlog,
    });

    try {
         addDiary.save()
        console.log("new dlog created")
    } catch (error) {
        if (error) {
            console.log(error)
        }
    }
    res.redirect('/')
      
})

app.get('/diary/:id/edit', (req, res) => {
    Diary.findById(req.params.id, (err, foundDiaryItem) => {
        if (err) throw err;
        res.render('edit.ejs', { diary: foundDiaryItem})
    })
})

app.put('/diary/:id', (req,res) => {

    var id = req.params.id
    var dlog = req.body.dlog;

    if(mongoose.Types.ObjectId.isValid(id)) {
        Diary.findByIdAndUpdate(id, {dlog: dlog}, (err, updated) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/');
                console.log(updated);
            }
        })   
    } 
    
    

})

app.delete('/diary/:id', (req, res) => {
    Diary.findByIdAndRemove(req.params.id, (err, resDelete) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
            // console.log(resDelete);
        }
    })
})

app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`app running on localhost ${PORT}`);
})