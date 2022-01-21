const express = require('express');
const path = require('path');

const ngApp = express();

ngApp.use(express.static('./dist/angular-quiz-app'));

ngApp.get('/*', function (request, response) {
    response.sendFile(path.join('angular-quiz-app', '/dist/src/index.html'));
});

ngApp.listen(process.env.PORT || 8080);