/* Auth config  --------------------------------*/
// @see http://frederiknakstad.com/authentication-in-single-page-applications-with-angular-js/

var passport = require('passport');
var User = require('./app/models/User'),

passport.use(User.localStrategy);
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);

// Default session handling. Won't explain it as there are a lot of resources out there
app.use(express.session({
    secret: "mylittlesecret",
    cookie: {maxAge: new Date(Date.now() + 3600000)}, // 1 hour
    maxAge: new Date(Date.now() + 3600000), // 1 hour
    store: new RedisStore(config.database.redis), // You can not use Redis 
}));

// The important part. Must go AFTER the express session is initialized
app.use(passport.initialize());
app.use(passport.session());

// Set up your express routes
var auth = require('./app/controllers/authController.js');

app.post('/auth/login', auth.login);
app.post('/auth/logout', auth.logout);
app.get('/auth/login/success', auth.loginSuccess);
app.get('/auth/login/failure', auth.loginFailure);