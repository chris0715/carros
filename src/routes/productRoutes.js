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

productRouter.route('/')
        .get(function (req,res){
            
            mongo.connect(mongoUrl, function (err,db){
                
                var tabla = db.collection('vehiculo');
                
                tabla.find().toArray(function (err,result){
                    
                        var kaba = result;
                        res.render('catalogo',{ Result: kaba});
                    });
                })
 
            })
            //res.render('catalogo')
       
        
   productRouter.route('/agregar')
           .get(function (req,res){
                mongo.connect(mongoUrl, function (err,db){
                
                var tabla = db.collection('vehiculo');
                
                tabla.insertOne({'descripcion': 'Ford Explorer','ruta':'s-media-cache-ak0.pinimg.com/originals/61/bb/e6/61bbe6af6dabd1b88ec2d019bb38bf9c.jpg', 'precio': 25400.00}, function (err,data){
                   res.send(data);
                    })
                
                })
           })
        

module.exports = productRouter;