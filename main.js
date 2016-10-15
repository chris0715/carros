/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var express = require('express');
var app = express();
var productRouter = require('./src/routes/productRoutes.js')

app.set('view engine', 'ejs');
app.set('views', './src/views' );


app.use(express.static('public'));
app.use('/catalogo', productRouter);


app.get('/', function (req,res){
    
    res.render('index')
    
});


app.listen(8080);