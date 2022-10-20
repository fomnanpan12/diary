const mongoose = require('mongoose');
const express = require('express');
const Router = express.Router();
const Diary = require('./model/diary')

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true})); //Parse URL-encoded bodies






// Router.get('/', (req,res) => {
//     res.render('index.ejs')
// });

Router.get('/add', (req, res) => {
    res.render('add.ejs')
});




Router.get('/singleDiary', (req, res) => {
    res.render('singleDiary.ejs')
});

module.exports = Router;