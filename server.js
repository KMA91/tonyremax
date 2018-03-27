const express = require('express');
const app = express();
const path = require('path');
// allows file path usage
const bodyParser = require('body-parser');
// allows req.body usage
const COConfig = require('./server/config/crossOriginConfig');
const keys = require('./server/config/keys/keys.js');
const mongoose = require('mongoose');
const session = require('express-session');
const sessionInfomation = {
  secret:'theMostSecureSecretKeyEver',
  resave:false,
  saveUninitialized: true,
  name:'myCookie',
  cookie: {
  secure: false,
  httpOnly:false,
  maxAge: 36000000
  }
}
// usage of session to session
const AWS = require('aws-sdk');
AWS.config.loadFromPath('./server/config/config.json');
app.use(COConfig);
app.use(session(sessionInfomation));
app.use(bodyParser.urlencoded({extended: true}));
// Returns middleware that only parses urlencoded bodies and only looks at requests where the Content-Type header matches the type option.
// This parser accepts only UTF-8 encoding of the body and supports automatic inflation of gzip and deflate encodings.
app.use(bodyParser.json());
// same as top, just for json
app.use(express.static(path.join(__dirname, 'public', "dist")));

// set NODE_ENV = production
console.log(process.env.NODE_ENV);

mongoose.connect(keys.mongoURI);

var route = require('./server/config/routes.js')(app)

app.get('*', (req,res)=>{
  res.sendFile(path.resolve('public/dist/index.html'))
})

const PORT = process.env.PORT || 6789;
app.listen(PORT,()=>console.log("Listening on port "+ PORT));
