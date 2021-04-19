const express = require('express');
const app = express();
const path = require('path')
const hbs = require('express-handlebars')
const port = process.env.PORT || 3000;


app.use(express.json())

//static 
app.use(express.static(path.join(__dirname, 'public')));

//the engine
app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default',
    layoutsDir: path.join(__dirname, 'views'),
    partialsDir: path.join(__dirname, 'views/partials')
}))

//connect mongo db
require('./server/database/database')();

//calling route
app.use('/', require('./server/router/router'))

app.listen(port);
