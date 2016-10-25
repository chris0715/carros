/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var mongo = require('mongoose');

var productSchema = mongo.Schema({
       descripcion: String,
       precio: String,
       path: String
});



var ProductM = mongo.model("product", productSchema);

module.exports = ProductM;