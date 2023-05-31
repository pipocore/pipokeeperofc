const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});

passport.use('signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({'email': email})
  const username = await User.findOne({'username': req.body.username})
  console.log(user)
  if(user) {
    return done(null, false, req.flash('error', 'E-mail já registrado.'));
  }
  else if (username) {
   return done(null, false, req.flash('error', 'Nome de usuário já registrado.'));
  }
  else {
    const newUser = new User();
    newUser.email = email;
	  newUser.username = req.body.username
    newUser.password = newUser.encryptPassword(password);
  console.log(newUser)
    await newUser.save();
    done(null, newUser);
    }
  }
));

passport.use('login', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  const user = await User.findOne({email: email});
  if(!user) {
    return done(null, false, req.flash('error', 'Usuário não encontrado.'));
  }
  if(!user.comparePassword(password)) {
    return done(null, false, req.flash('error', 'Senha incorreta.'));
  }
  return done(null, user);
}));