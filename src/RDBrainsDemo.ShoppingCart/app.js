var express = require('express'),
    redis = require('redis'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    redisStore = require('connect-redis')(session),
    bodyParser = require('body-parser');

var client = redis.createClient('6379','demoredis'),//CREATE REDIS CLIENT
    app = express();

client.on('connect', function () {
    console.log('connected');
});

app.use(cookieParser('yoursecretcode'));
app.use(session(
    {
        secret: 'yourothersecretcode', 
        store: new redisStore({ host: 'demoredis', port: 6379, client: client }),
        cookie: { expires: new Date(253402300000000)},
        saveUninitialized: true, // don't create session until something stored,
        resave: true // don't save session if unmodified
    }
));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var router = express.Router();

function CartItem(product) {
    this.product = product;
}

router.post('/addcart/:product', function (req, res) {
    var cartItem = new CartItem(req.params.product);
    if (req.session.cart) {
        req.session.cart.push(cartItem);
    }
    else {
        req.session.cart = new Array(cartItem);
    }
    
    res.send("product added to cart")
});


router.get('/getcart', function (req, res) {
    
    if (req.session.cart)
        res.json(req.session.cart);
    else
        res.send("card empty");
});

app.use('/', router);
var server = app.listen(5002, function () {
    console.log('REDIS SESSION server is listening on port %d', server.address().port);
});




