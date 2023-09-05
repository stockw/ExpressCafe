const express = require('express');
const path = require('path');
const logger = require('morgan');
const favicon = require('serve-favicon');
const bcrypt = require('bcrypt');
const cors = require('cors');

// MODELS
const User = require('./models/user');
const category = require('./models/category');
const Item = require('./models/item');
const Order = require('./models/orders');

// require passport and session for user loggin
const passport = require('passport');
const session = require('express-session');
const initializePassport = require('./config/passport-config');

//database
require('dotenv').config();
require('./config/database'); //connect to our database (code should be after the require dotenv)


const app = express();

// some middleware
app.use(cors({
    origin: "*"
}));

// Logs the different requests to our server
app.use(logger('dev'));
//parse stringified objects (JSON)
app.use(express.json());

//Config both favicon and static middleware
//serve from Build folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));

//use passport
initializePassport(
    passport,
    // passport tells us that they want a function that will return the correct user given an email
    async email => {
        let user = User.findOne({email: email})
        return user;
    },
    async id => {
        let user = User.findById(id);
        return user;
    },
);

app.use(session({
    // making sure the session cookie should only be sent over secure connections (https)
    secure: true,
    // using a session key that has been created. (Session keys should be kept secure and not hardcoded in your code)
    secret: process.env.SESSION_SECRET,
    // controls whether the session should be saved back to the session store even if it was not modified during the request
    resave: true,
    // controls whether a session should be stored for a new user that has not been assigned a session
    saveUninitialized: true,
    // length of time set for seesion to be closed due to inactivity (in milliseconds)
    cookie: { originalMaxAge: 3600000 }// 1 hr of inactivity
}))


//routes
app.get('/get_categories', async (req, res) => {
    let arrayOfCategories = await Category.find();
    res.json(arrayOfCategories)
})

app.get('/get_items', async (req, res) => {
    // when we have references in our Schemas, we can use the populate method to get that data
    let arrayOfItems = await Item.find().populate('category');

    res.json(arrayOfItems)
})

app.get('/test_route', (req, res) => {
    res.send("good route!")
})


app.get('/session-info', (req, res) => {
    res.json({
        session: req.session
    });
});


app.post('/users/signup',async (req, res) => {

    let hashedPassword = await bcrypt.hash(req.body.password, 10)

    // use User model to place user in the database
    let userFromCollection = await User.create({
        email: req.body.email,
        name: req.body.name,
        password: hashedPassword
    })

    // sending user response after creation or login
    res.json("user created")
});


app.put('/users/login', async (req, res, next) => {
    console.log(req.body);
    // passport authentication
    passport.authenticate("local", (err, user, message) => {
        console.log(message);
        if (err) throw err;
        if (!user) {
            res.json({
                message: "login failed",
                user: false
            })
        } else {
            // delete user.password
            req.logIn(user, err => {
                if (err) throw err;
                res.json({
                    message: "successfully authenticated",
                    // remove user
                })
            })
        }
    })(req, res, next);
})

app.get("/get_cart", async (req, res) => {
    // get cart/order from database
    console.log(req.session);
    let cart = await Order.getCart(req.session.passport.user._id);
    console.log(cart);
    res.json(cart)
})

// for the "add" button

app.put('/add_to_cart/:itemId', async (req, res) => {
    let { itemId } = req.params;
    let userId = req.session.passport.user._id;
    let cart = await Order.getCart(userId);
    console.log(cart); 
    // check if orderItems already has this item (the we will +1)
    // if not, add it to the array
    const orderItem = cart.orderItems.find(orderItem => orderItem.item._id.equals(itemId))

    if (orderItem) {
        orderItem.qty += 1;
    } else {
        const item = await Item.findById(itemId);
        console.log(item);
        cart.orderItems.push({
            qty: 1,
            item
        });
    }

    cart.save()
    res.send(cart)
})

app.put('/change_qty', async (req, res) => {
    let { itemId, newQty } = req.body;
    let userId = req.session.passport.user._id;
    console.log(itemId, newQty, userId);

    let cart = await Order.getCart(userId); // checkoutDone false
    const orderItem = cart.orderItems.find(orderItem => {
        console.log(orderItem.item, itemId);
        if (orderItem.item._id.equals(itemId)) {
            return orderItem
        }
        
    })
    console.log(orderItem);
    orderItem.qty = newQty;

    // check if qty is 0
    if (orderItem.qty === 0) {
        orderItem.remove();
    }

    cart.save()

    res.send(cart)
})


app.put("/checkout", async (req, res) => {
    let cart = await Order.getCart(req.session.passport.user._id);

    cart.checkoutDone = true;
    cart.save()

    res.send(cart)

})


//create Catch-All route using (/*)
// The catch all route is necessary to return the index.html on all non-AJAX requests
app.get('/*', (req, res) => {
res.sendFile(path.join(__dirname, 'build', 'index.html')); 	
});

//listening
 app.listen(5000, () => {
    console.log('listening on port 5000');
 });

 