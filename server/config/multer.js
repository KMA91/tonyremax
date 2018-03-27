// USED TO UPLOAD/REMOVE IMAGES INTO s3 BUCKET
const multer = require('multer'),
      multers3 = require('multer-s3'),
      fs = require('fs'),
      AWS = require('aws-sdk'),
      s3 = new AWS.S3();

exports.upload =
  multer({
        storage: multers3({
            s3: s3,
            bucket: 'mean-realestate',
            contentType: multers3.AUTO_CONTENT_TYPE,
            key: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            }
        })
    }).single('file')

exports.remove = (key) => {
  var keyReplace = key.split('/').pop()
  var params = { Bucket: 'mean-realestate', Key: keyReplace};
  s3.deleteObject(params, function(err, data) {
    return;
  })
}
