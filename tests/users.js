'use strict';
let expect = require('chai').expect;

let Users = require('../users');

describe('Users',function(){
    beforeEach(function(){
        Users.clearRegistry();
    });
    describe('.addUser',function(){
        it('should add user by nickname',function(){
            Users.addUser({
                name: 'testuser',
            });
            expect(Users.getUser('testuser').name).to.eql('testuser');
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
    });
});