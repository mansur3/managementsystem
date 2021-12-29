const express = require("express");
const app = express();
const cors = require("cors");
// const passport = require("passport");
require('dotenv').config()
const passport = require("./configs/passport")
const session = require("express-session");
const User = require("./models/user.model.js");

app.use(express.json());

app.use(cors({origin: 'http://localhost:3000', credentials: true}));




// google autentication
const { register, login } = require("./controllers/auth.controller");

app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: 'secretcode',
        resave: true,
        saveUninitialized: true,
    })
)
app.use(passport.initialize());
app.use(passport.session());


passport.serializeUser(function ({ user, token }, done) {
    done(null, { user, token });
});

passport.deserializeUser(function ({ user, token }, done) {
    done(null, { user, token });
});

// Google Authentication

app.get("/auth/google/failure", function (req, res) {
    return res.send("Something went wrong");
})

app.get('/auth/google',
    passport.authenticate('google', {
        scope:
            ['email', 'profile']
    }
    ));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/auth/google/failure'
    }), function (req, res) {
        const { user, token } = req.user;
        res.status(200).redirect("http://localhost:3000");
    });



    app.get('/profile', isLoggedIn,async  function(req, res) {
        const usera = await User.findById(req.user.user._id);
        // console.log(usera);
        res.send({user : usera, token : req.user.token});
    });

    function isLoggedIn(req, res, next) {
        // if user is authenticated in the session, carry on
        if (req.isAuthenticated()){
            // console.log(req.user);
            return next();
        }
            
        // if they aren't redirect them to the home page
        res.redirect('/');
    }
    
    app.post("/register", register);
    app.post("/login", login);


















//Controllers 

const studentController = require("./controllers/student.controller");
const contestController = require("./controllers/contest.controller")


app.use("/student", studentController);
app.use("/contest", contestController);

module.exports = app;