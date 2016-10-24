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


productRouter.route('/')
        .get(function (req,res){
            
            mongo.connect(mongoUrl, function (err,db){
                if(err)
                    res.redirect("/");
                
                else{
                var tabla = db.collection('vehiculo');
                
                tabla.find().toArray(function (err,result){
                        if(err || result==null)
                            console.log('Hubo un error o no se encontraron resultados')
                        else{
                        var kaba = result;
                        res.render('catalogo',{ Result: kaba});
                            }
                    });
                }})
 
            })
            //res.render('catalogo')
       
        
   productRouter.route('/agregar')
           .get(function (req,res){
               res.render('agregar')
                
           })
        .post( multer({dest: 'public/uploads'}).single('imgInput'),function(req, res){
                mongo.connect(mongoUrl, function (err,db){
       
                var tabla = db.collection('vehiculo');
                
                tabla.insertOne({"descripcion" : req.body.descInput, "ruta" : req.file.filename , "precio" : req.body.precioInput});
                })
                            
    });
                       

module.exports = productRouter;