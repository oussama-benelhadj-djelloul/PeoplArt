const multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        //get the exe of the file
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'))
        cb(null, file.fieldname + '-' + Date.now() + ext)
    }
})

store = multer({ storage: storage });

module.exports = store