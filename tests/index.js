'use strict';

let chai = require("chai");
let expect = require("chai").expect;

chai.use(require("chai-http"));

let app = require("./../app");
let server;

describe("HTTP API",function() {
    before(function() {
        server = app.listen();//let OS decide port and hostname
    });
    it('should add user by nickname',function(){
        chai.request(server)
            .post("/users/test1")
            .end((err,res) => {
                expect(res).to.have.status(200);
            });
    });
    it('should add user with nickname and full name',function(){
        chai.request(server)
            .post("/users/test2/Test the Two")
            .end((err,res) => {
                expect(res).to.have.status(200);
            });
    });
    /*it('should fail with full name only',function(){
        expect(function(){
            Users.addUser({
                fullname: 'Test User',
            });
        }).to.throw(Users.invalidUserError);
    });
    it('should not double add',function(){
        Users.addUser({
            name: 'testuser',
        });
        expect(function() {
            Users.addUser({
                name: 'testuser',
            });
        }).to.throw(Users.InvalidUserError);
    });*/
});