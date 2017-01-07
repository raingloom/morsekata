'use strict';
let expect = require("chai").expect;

let Users = require("../users")

describe("Users",function(){
    describe(".register",function(){
        it("should work with username only",function(){
            expect(Users.register("testUser")).to.be.ok;
        });
        it("should work with username and real name",function(){
            expect(Users.register("testUser","Mr User of Testonia")).to.be.ok;
        });
        it("should not work with real name only",function(){
            expect(
                function(){
                    Users.register("testUser","Mr User of Testonia");
                }
            ).to.throw(Users.UserExistsException);
        });
    });
});