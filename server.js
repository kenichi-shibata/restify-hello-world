var restify = require('restify'); 

function respond(req, res, next) { 
res.send('hello '+ req.params.name);
} 

var server = restify.createServer();

server.use(
  function crossOrigin(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    return next();
  }
);

server.opts(/.*/, function (req,res,next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", req.header("Access-Control-Request-Method"));
    res.header("Access-Control-Allow-Headers", req.header("Access-Control-Request-Headers"));
    res.send(200);
    return next();
});

server.get('/test', function (req,res,next) {

    res.send({
        status: "ok"
    });
    return next();
});

server.get('/hello/:name', respond);
server.head('/hello/:name', respond); 

server.listen(80, function() {
 console.log('%s listening at %s', server.name, server.url);
});
