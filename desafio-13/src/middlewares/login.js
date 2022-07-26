const isLoggedIn = (req, res, next) => {
    if(req.user) {
        next()
    }
    else {
        return res.redirect('/login')
    }
};
const loginErrorHandler = (err, req, res, next) => {
    if(err) return res.redirect('/failedLogin')
    else{
        next()
    }
};


module.exports = 
    isLoggedIn, 
    loginErrorHandler
;