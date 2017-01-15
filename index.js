'use strict';

let app = require("./app");

let server = app.listen(
    process.env.PORT,
    process.env.IP,
    function() {
        let address = server.address();
        console.log('MOARSE is running at %s:%s', address.ip, address.port);
    }
);