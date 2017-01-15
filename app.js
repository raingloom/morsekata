'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

let Users = require("./users");
let Session = require("./session");
let Messages = require("./messages");

app.post('/users',function(req, res){
    try {
        let username = req.body.username;
        let name = req.body.name;
        Users.addUser({
            name: username,
            fullname: name,
        });
        Session.generateFor(username);
        Messages.createInbox(username);
        res.status(200).send({
            token: Session.getToken(username),
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

app.post('/users/:username/messages',function(req, res) {
    let token = req.header('X-Auth');
    if(token!==undefined && Session.hasUser(token)) {
        let user = req.params.username;
        let message = String(req.body.message || "");
        if(Messages.hasInbox(user)) {
            //TODO: check message
            Messages.send(Session.getName(token),user,message);
            res.status(200).send();
        } else {
            res.status(404).send();
        }
    } else {
        res.status(401).send();
    }
});

module.exports = app;