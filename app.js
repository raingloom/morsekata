'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

let Users = require("./users");
let Session = require("./session");
let Messages = require("./messages");

app.post('/users/:name/:fullname?',function(req, res){
    try {
        console.log(req.params);
        Users.addUser({
            name: req.params.name,
            fullname: req.params.fullname,
        });
        Session.generateFor(req.params.name);
        res.status(200).send({
            token: Session.getToken(req.params.name),
        });
    }
    catch (e) {
         if (e instanceof Users.InvalidUserError) {
            res.status(400).send();
        } else {
            //this should not happen, rethrow error
            throw e;
        }
    }
});

module.exports = app;