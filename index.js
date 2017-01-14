'use strict';

let app = require("./app");

let server = app.listen(
    process.env.PORT || 80,
    process.env.IP || '0.0.0.0',
    function() {
        let address = server.address();
        console.log('MARSE is running at %s:%s', address.ip, address.port);
    }
);