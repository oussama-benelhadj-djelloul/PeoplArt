const route = require('express').Router();
const contr = require('../controller/controller')
const store = require('../middleware/multer');

route.get('/', contr.home);

route.post('/uploadmultipe', store.array('images', 12), contr.uploads);

module.exports = route