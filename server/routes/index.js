'use strict';

const apiRoute = require('./apis');

function init(server) {
    // server.get('*', function (req, res, next) {
    //     console.log('Request was made to: ' + req.originalUrl);
    //     return next();
    // });

    // server.get('/', function (req, res) {
    //     res.redirect('/home');
    // });

    server.use('/', apiRoute);
}

module.exports = {
    init: init
};