const express = require('express');
const path = require('path');

const ngApp = express();

ngApp.use(express.static('./dist/angular-quiz-app'));

ngApp.get('/*', function (request, response) {
     response.sendFile('index.html', {root: 'dist/angular-heroku/'});
});

ngApp.listen(process.env.PORT || 8080);