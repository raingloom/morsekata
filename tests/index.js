'use strict';

let chai = require("chai");
let expect = require("chai").expect;

chai.use(require("chai-http"));

let app = require("./../app");
let server;

describe("HTTP API",function() {
    beforeEach(function() {
        server = app.listen();//let OS decide port and hostname
    });
    it('should add user by nickname',function(){
        chai.request(server)
            .get("/user/:testuser")
            .end((err,res) => {
                console.log(res);
                expect(res).to.have.status(200);
            });
    });
    it('should add user with nickname and full name',function(){
        Users.addUser({
            name: 'testuser',
            fullname: 'Test User',
        });
        expect(Users.getUser('testuser').name).to.eql('testuser');
        expect(Users.getUser('testuser').fullname).to.eql('Test User');
    });
    it('should fail with full name only',function(){
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
    });
});