const isLoggedIn = (req, res, next) => {
    if(req.session?.username) {
        next()
    }
    else {
        return res.redirect('/login')
    }
}

module.exports = isLoggedIn