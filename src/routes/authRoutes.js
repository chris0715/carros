/**
 * Created by muldog on 10/18/16.
 */


var express = require('express');
var AuthRouter =  express.Router();
var mongo = require('mongoose');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy
var User = require('../models/user');


passport.use(new localStrategy(function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
     // if (!user.validPassword(password)) {
       // return done(null, false, { message: 'Incorrect password.' });
     // }
      return done(null, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});


AuthRouter.use(function (req,res,next){
    
    res.locals.currentUser = req.user;
    
    next();
});





 AuthRouter.route('/signup')
         .get( function (req,res) {
             res.render("signup");
         })
         .post(function (req,res,next) {
             var username = req.body.username;
             var password = req.body.password;
             var usuario = new User({
                 username: username,
                 password: password
             });
             usuario.save(next);
             res.send("Exito");
         });

AuthRouter.get("/login", function (req,res){
    res.render("login");
})

AuthRouter.post("/login",passport.authenticate("local", {
                                   successRedirect: '/',
                                   failureRedirect: '/auth/login'}), function (req,res){
    
    res.render("login");
});

AuthRouter.get("/logout", function (req,res){
    req.logOut();
    res.redirect("/");
})



module.exports = AuthRouter;