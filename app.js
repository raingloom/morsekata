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

app.post('/users/:username/messages',function(req) {
    let token = req.header('X-Auth');
    console.log(token);
    if(token!==undefined && Session.hasUser(token)) {
        let user = req.params.username;
        if(Messages.hasInbox(user)) {
            //TODO: check message
            Messages.send(Session.getName(token),user,req.body.message);
        } else {
            req.status(404).send();
        }
    } else {
        req.status(401).send();
    }
});

module.exports = app;