var express = require('express'),
    bodyParser = require('body-parser'),
    redis = require("redis"),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    redisStore = require('connect-redis')(expressSession);


var app = express();
var client = redis.createClient();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser('mysecretcode'));
app.use(expressSession({
    secret: 'myothersecretcode', 
    cookie: { maxAge: 7 * 24 * 60 * 3600 * 1000 },
    //store: new redisStore({ host: 'demoredis', port: 6379, client: client, ttl : 260 }),
    saveUninitialized: true, 
    resave: true
}));

function CartItem(product){
    this.product = product;
}

var sess;

app.get('/', function (req, res) {
    sess = req.session;
});

app.post('/addcart/:product', function (req, res) {
    var cartItem = new CartItem(req.params.product);
    sess = req.session;
    if (sess.cart) {
       sess.cart.push(cartItem);
    }
    else {
        sess.cart = new Array(cartItem);
     }
    
    res.send("product added to cart")
});


app.get('/getcart',  function (req, res) {
    sess = req.session;
    if (sess.cart)
        res.json(sess.cart);
    else
        res.send("card empty");
});

var server = app.listen(5002, function () {
    console.log('BASIC SESSION server is listening on port %d', server.address().port);
});