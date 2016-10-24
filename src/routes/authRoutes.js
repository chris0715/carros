/**
 * Created by muldog on 10/18/16.
 */


var express = require('express');
var AuthRouter =  express.Router();
var mongo = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017/carros';




AuthRouter.route('/')
    .get(function (req,res) {
        res.send('its working dude');
    })


     AuthRouter.route('/signup')
         .get( function (req,res) {
             res.render("signup");
         })
         .post(function (req,res) {
             console.log(req.body);
         });

AuthRouter.get("/login", function (req,res){
    res.render("login");
})




module.exports = AuthRouter;