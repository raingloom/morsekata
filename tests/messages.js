'use strict';

let expect = require("chai").expect;

let Messages = require("./../messages");

describe('Messages',function(){
    it("should not leak internal objects", function() {
        Messages.createInbox('nobody');
        Messages.send('nobody','nobody','message');
        expect(Messages.getInboxContents('nobody')).to.deep.equal(Messages.getInboxContents('nobody'));
        expect(Messages.getInboxContents('nobody')).to.not.equal(Messages.getInboxContents('nobody'));
    });
});