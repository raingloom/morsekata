'use strict';
let expect = require("chai").expect;

let Users = require("../users")

describe("Users",function(){
    describe(".register",function(){
        it("should work with username only",function(){
            expect(Users.register("testUser")).to.be.ok();
        });
    });
});