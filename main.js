/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var express = require('express');
var app = express();
var productRouter = require('./src/routes/productRoutes.js')
var parser = require('body-parser');
var authRouter = require('./src/routes/authRoutes');
var session = require('express-session');
var cookies = require('cookie-parser');
var passport = require('passport');
var mongo = require('mongoose');

app.use(parser.urlencoded({extended: false}))
app.use(cookies());
app.use(session({
    secret: "library",
    saveUninitialized: true,
    resave:true}));
app.use(passport.initialize())
app.use(passport.session());

app.set('view engine', 'ejs');
app.set('views', './src/views' );

app.use(express.static('public'));
productRouter.use(express.static('public'))
authRouter.use(express.static('public'))

app.use('/catalogo', productRouter);
app.use('/auth', authRouter)

mongo.connect("mongodb://localhost:27017/ivan")

app.get('/', function (req,res){
    
    res.locals.currentUser = req.user;
    res.render('index')
    
});

app.use(function(req,res){
    res.status(404).send("Not Found!");
})


app.listen(process.env.PORT || 5000, "0.0.0.0", function(){
    console.log('Listening on port '+this.address().port);
});