'use strict';

let chai = require("chai");
let expect = require("chai").expect;

chai.use(require("chai-http"));

let app = require("./../app");
let Users = require("./../users");//a bit ugly but meh. this aint no nail.
let server;

describe("HTTP API",function() {
    before(function() {
        server = app.listen();//let OS decide port and hostname
    });
    beforeEach(function() {
        Users.clearRegistry();
    });
    it('should add user by nickname',function(){
        chai.request(server)
            .post("/users/testuser")
            .end((err,res) => {
                expect(res).to.have.status(200);
            });
    });
    it('should add user with nickname and full name',function(){
        chai.request(server)
            .post("/users/testuser")
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