var express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser('mysecretcode'));
app.use(expressSession({
    secret: 'myothersecretcode', 
    cookie: { maxAge: 7 * 24 * 60 * 3600 * 1000 },
    saveUninitialized: true, 
    resave: true
}));

var router = express.Router();

function CartItem(product){
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
    console.log('BASIC SESSION server is listening on port %d', server.address().port);
});