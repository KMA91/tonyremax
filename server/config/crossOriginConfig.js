module.exports = (req, res, next) => {
//set headers to allow cross origin request.
    res.header("Access-Control-Allow-Credentials: true");
    res.header("Access-Control-Allow-Origin", "/");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
}
