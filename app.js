const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./router');
//absolute path
const path = require('path');

const app = express();
app.use('/static', express.static(path.join(__dirname, 'public')));

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//passing app into routes
routes(app);

app.listen(3000);

// module.exports = app;
