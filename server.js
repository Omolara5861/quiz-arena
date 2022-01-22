const express = require('express');
const path = require('path');
const ngApp = express();
ngApp.use(express.static('./dist/Angular-Quiz-App'));
ngApp.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, '/dist/Angular-Quiz-App/index.html'));
});
ngApp.listen(process.env.PORT || 8080);