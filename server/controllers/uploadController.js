const mongoose = require('mongoose')
const Listing = mongoose.model('Listing');
const multerUpload = require('../config/multer');

module.exports = {
  uploadImage: (req, res) => {
    multerUpload.upload(req, res, function(){
      return res.json(req.file);
    });
  },

  removeImage: (req, res) => {
    multerUpload.remove(req.body.s3Name);
    return;
  }
}
