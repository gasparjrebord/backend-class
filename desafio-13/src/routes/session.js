const { Router } = require("express");
const passport = require('../passport');
const path = require("path");
const loginErrorHandler = require("../middlewares/login");


const sessionsRouter = Router();

sessionsRouter.get('/login', (req, res, next) => {
    res.sendFile(path.join(process.cwd(), 'public', 'pages', 'login.html'))
});

sessionsRouter.get('/signup', (req, res, next) => {
    res.sendFile(path.join(process.cwd(), 'public', 'pages', 'signup.html'))
});

sessionsRouter.get('/failedLogin', (req, res, next) => {
    res.sendFile(path.join(process.cwd(), 'public', 'pages', 'failedLogin.html'))
});

sessionsRouter.post('/login', passport.authenticate('login'), loginErrorHandler , (req, res, next) => {
    return res.redirect('/')
});

sessionsRouter.post('/signup', passport.authenticate('signup'), loginErrorHandler, (req, res, next) => {
    res.redirect('/')
});


sessionsRouter.get('/logout', (req, res, next) => {
    const username = req.user.username
    req.logout((error) => {
        if(error) res.send(`Error: ${error}`)
        else {
            res.send(username)
        }
    })
});

sessionsRouter.get('/user', (req, res, next) => {
    if(req.user) res.send({username: req.user.username, email: req.user.email})
    else res.send('invitado')
});

module.exports = sessionsRouter;