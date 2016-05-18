module.exports = function(req, res){
    res.send('Hello, I am here! ' + req.params.path);
}