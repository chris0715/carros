/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var express = require('express');
var productRouter = express.Router();
var mongo = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017/carros';
var elId = require('mongodb').ObjectId;
var multer = require('multer');
//var upload = multer({dest: 'uploads/'})
var ProductM = require('../models/product');


productRouter.use(function (req,res,next){
    res.locals.currentUser = req.user;
    
    next();
})

productRouter.route('/')
        .get(function (req,res){
            
            
                
                ProductM.find( function (err,data){
                    if(err || data==null)
                            console.log('Hubo un error o no se encontraron resultados')
                        else{
                        var kaba = data;
                        console.log(kaba);
                        res.render('catalogo',{ Result: kaba});
                            }
                    
                })
                        
                    });
               
 
                
            //res.render('catalogo')
       
        
   productRouter.route('/agregar')
           .get(function (req,res){
               res.render('agregar')
                
           })
        .post( multer({dest: 'public/uploads'}).single('imgInput'),function(req, res){
               
       
              var product = new ProductM({
                  descripcion: req.body.descInput,
                  precio: req.body.precioInput,
                  path: req.file.filename
              })
              
              product.save();
                            
    });
                       

module.exports = productRouter;