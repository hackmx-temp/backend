const express = require("express");

let _express = null;
let _config = null;

class Server {
    constructor({ config, router }){
        _config = config;
        _express = express().use(router);
    }

    start(){
        return new Promise(resolve => {
            _express.listen(_config.NODE_LOCAL_PORT, () => {
                console.log(
                    "Hack-MX running on port " + _config.NODE_LOCAL_PORT
                );

                resolve();
            });
        });
    }
}

module.exports = Server;
