const UploadModel = require('../model/schema');
const fs = require('fs');

exports.home = async function (req, res) {
    const images = await UploadModel.find();
    res.render('main', { images: images });
}

exports.uploads = function (req, res, next) {
    const files = req.files;
    if (!files) {
        const error = new Error('please choose file');
        error.httpStatusCode = 400;
        return next(error);
    }

    //convet imgs into base64 encoding
    let imgArray = files.map(function (file) {
        let img = fs.readFileSync(file.path)
        return encode_image = img.toString("base64");
    })

    let result = imgArray.map(function (src, index) {
        //create obg to stote in db
        let finalimg = {
            filename: files[index].originalname,
            contentType: files[index].mimetype,
            imageBase64: src
        }

        let newUpload = new UploadModel(finalimg);
        return newUpload
            .save()
            .then(function (res) {
                return {
                    msg: `You  image ${files[index].originalname} uploaded success go back to the home page now to see it there`,
                }

            })
            .catch(err => {
                if (err) {
                    if (err.name == 'MongoError' && error.code === 11000) {
                        return Promise.reject({ error: 'duplicae file' })
                    }
                    return Promise.reject({ error: error.message || 'cannot upload' })
                }
            })

    });

    Promise.all(result)
        .then(function (msg) {
            res.json(msg)
            //res.redirect('/')
        })
        .catch(function (err) {
            res.json(err)
        })
}
















