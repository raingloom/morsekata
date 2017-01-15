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
    it('should add user by nickname',function(done){
        chai.request(server)
            .post("/users/test1")
            .end((err,res) => {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.have.property('token');
                expect(res.body.token).to.be.a('string');
                expect(res.body.token).to.have.length.above(0);
                done();
            });
    });
    it('should add user with nickname and full name',function(done){
        chai.request(server)
            .post("/users/test2/Test the Two")
            .end((err,res) => {
                expect(res).to.have.status(200);
                done();
            });
    });
    it('should not double add',function(done){
        chai.request(server)
            .post("/users/test1")
            .end((err,res) => {
                expect(res).to.have.status(400);
                done();
            });
    });
});