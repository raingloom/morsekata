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
    describe('registration',function() {
        it('should add user by nickname',function(done){
            chai.request(server)
                .post("/users")
                .send({
                    username: "test1"
                })
                .end((err,res) => {
                    testForOkResponse(res);
                    done();
                });
        });
        it('should add user with nickname and full name',function(done){
            chai.request(server)
                .post("/users")
                .send({
                    username: "test2",
                    name: "Test the Two",
                })
                .end((err,res) => {
                    testForOkResponse(res);
                    done();
                });
        });
        it('should give different tokens for users',function(done){
            let token1, token2;
            chai.request(server)
                .post("/users")
                .send({
                    username: "testA"
                })
                .end((err,res) => {
                    token1=res.body.token;
                    chai.request(server)
                        .post("/users")
                        .send({
                            username: "testB"
                        })
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
                .post("/users")
                .send({
                    username: "test1"
                })
                .end((err,res) => {
                    expect(res).to.have.status(400);
                    done();
                });
        });
    });
    
    let alicetoken, bobtoken;
    describe('message', function() {
        before(function(done) {
            chai.request(server)
                .post('/users')
                .send({
                    username: "alice",
                    name: "Al Ice",
                })
                .end(function(err,res){
                    alicetoken=res.body.token;
                    chai.request(server)
                        .post('/users')
                        .send({
                            username: "bob",
                            name: "Bo Bert"
                        })
                        .end(function(err,res){
                            bobtoken=res.body.token;
                            done();
                        });
                });
        })
        describe('sending', function() {
            it('should reject without X-Auth', function(done) {
                chai.request(server)
                    .post("/users/alice/messages")
                    .end((err,res) => {
                        expect(res).to.have.status(400);
                        done();
                    });
            });
            it('should reject with malformed X-Auth', function(done) {
                chai.request(server)
                    .post("/users/alice/messages")
                    .set("X-Auth","this token is most definitely wrong, it not, well, i did the best I can")
                    .end((err,res) => {
                        expect(res).to.have.status(400);
                        done();
                    });
            });
            it('should four o four if user does not exist on this plane of reality', function(done) {
                chai.request(server)
                    .post("/users/thisuserdoesntexistatleastisurehopeso/messages")
                    .set("X-Auth",alicetoken)
                    .end((err,res) => {
                        expect(res).to.have.status(404);
                        done();
                    });
            });
        });
    });
});