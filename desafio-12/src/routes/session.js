const { Router } = require("express");
const path = require("path");


const sessionsRouter = Router();

sessionsRouter.get('/login', (req, res, next) => {
    res.sendFile(path.join(process.cwd(), 'public', 'login.html'))
})

sessionsRouter.post('/login', (req, res, next) => {
    const {username} = req.body
    req.session.username = username
    return res.redirect('/')
})

sessionsRouter.get('/logout', (req, res, next) => {
    const username = req.session.username
    req.session.destroy((error) => {
        if(error) res.send(`Error: ${error}`)
        else {
            res.send(username)
        }
    })
})

sessionsRouter.get('/user', (req, res, next) => {
    if(req.session?.username) res.send(req.session.username)
    else res.send('invitado')
})

module.exports = sessionsRouter