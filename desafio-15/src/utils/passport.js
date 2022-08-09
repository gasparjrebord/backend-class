const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const userDao = require("../daos/userDao");

passport.use("signup", new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, callback) => {
      const user = await userDao.find("username", username);
      if (user) {
        return callback(new Error("Ya existe un usuario con ese nombre"), false);
      } else {
        const newUser = {
          id: Date.now(),
          username,
          password: bcrypt.hashSync(password, bcrypt.genSaltSync(10), null),
          email: req.body.email
        };
        await userDao.addItem(newUser);
        return callback(null, newUser);
      }
    }
  )
);

passport.use("login", new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, callback) => {
      const user = await userDao.find("username", username);
      if (!user || !bcrypt.compareSync(password, user.password)) {
        callback(new Error("Datos incorrectos"), false);
      } else {
        return callback(null, user);
      }
    }
  )
);

passport.serializeUser((newUser, done) => {
  done(null, {id: newUser.id, username: newUser.username});
});

passport.deserializeUser(async (usuario, done) => {
  try {
    const user = await userDao.find('username', usuario.username);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

module.exports = passport