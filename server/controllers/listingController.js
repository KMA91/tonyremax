const mongoose = require('mongoose')
const Listing = mongoose.model('Listing');
const s3 = require('../config/multer');

module.exports = {
  addListing: (req, res) => {
    var listing = new Listing(req.body);
    listing.save((err, listing) => {
      if(err){
        res.status(500).send("Make sure to add an address, Tony!")
      }else{
        return res.json(listing);
      }
    })
  },

  removeImage: (req, res) => {
    var params = { Bucket: 'mean-realestate', Key: req.body.key};
    s3.deleteObject(params, function (err, data) {
      if(data){
      }else{
      }
    })
    return;
  },

  getActive: (req, res) => {
    Listing.find({sold: false}, (err, listings) =>{
      if(err){
        console.log(err);
      }else{
        return res.json(listings);
      }
    })
  },

  getSold: (req, res) => {
    Listing.find({sold: true}, (err, listings) =>{
      if(err){
        console.log(err);
      }else{
        return res.json(listings);
      }
    })
  },

  getListing: (req, res) => {
    Listing.findOne({_id: req.params.id}, (err, listing) => {
      if(err){
          return res.sendStatus(500);
      } else {
          return res.json(listing);
      }
    })
  },

  getAllListings: (req, res) => {
    Listing.find({}, (err, listings) => {
      if(err){
        return res.sendStatus(500);
      }else{
        return res.json(listings);
      }
    })
  },

  changeSoldStatus: async (req, res) => {
    var listing = await Listing.findOne({_id: req.body.id})
    if(listing.sold){
      listing.sold = false;
    }else{
      listing.sold = true;
    }
    listing = await listing.save();
    return res.json(listing);
  },

  deleteImage: async (req, res) => {
    // console.log(req.body.path);
    var listing = await Listing.findOne({_id: req.body.id })
    for(var i = 0; i < listing.paths.length; i++){
      if(listing.paths[i] === req.body.path){
        await s3.remove(req.body.path);
        listing.paths.splice(i, 1);
      }
      listing = await listing.save()
    }
    res.json(listing);
  },

  deleteListing: async (req, res) => {
    var listing = await Listing.findOne({_id: req.body.id})
    for(var i = 0 ; i < listing.paths.length; i++){
      await s3.remove(listing.paths[i]);
    }
    listing = await Listing.remove({_id: req.body.id})
    res.json({ done: true });
  },

  addMoreImages: async (req, res) => {
    var listing = await Listing.findOne({_id: req.body.id});
    req.body.paths.forEach((path) => {
      listing.paths.push(path);
    });
    console.log(listing);
    await listing.save();
    res.json(listing);
  },

  changeAddress: async (req, res) => {
    var listing = await Listing.findOne({_id: req.body.id});
    listing.address = req.body.address;
    await listing.save();
    res.json(listing);
  }
}
