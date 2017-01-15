'use strict';

let chai = require("chai");
let expect = require("chai").expect;

chai.use(require("chai-http"));

let app = require("./../app");
let server;

function testForOkResponse(res) {
    expect(res).to.have.status(200);
    expect(res).to.be.json;
    expect(res.body).to.have.property('token');
    expect(res.body.token).to.be.a('string');
    expect(res.body.token).to.have.length.above(0);
}

describe("HTTP API",function() {
    before(function() {
        server = app.listen();//let OS decide port and hostname
    });
    it('should add user by nickname',function(done){
        chai.request(server)
            .post("/users/test1")
            .end((err,res) => {
                testForOkResponse(res);
                done();
            });
    });
    it('should add user with nickname and full name',function(done){
        chai.request(server)
            .post("/users/test2/Test the Two")
            .end((err,res) => {
                testForOkResponse(res);
                done();
            });
    });
    it('should give different tokens for users',function(done){
        let token1, token2;
        chai.request(server)
            .post("/users/testA")
            .end((err,res) => {
                token1=res.body.token;
                chai.request(server)
                    .post("/users/testB")
                    .end((err,res) => {
                        token2=res.body.token;
                        expect(token1).to.not.eql(token2);
                        //can't really make sure it NEVER happens, but at least we can make sure it doesn't happen in the trivial case
                        done();
                    });
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