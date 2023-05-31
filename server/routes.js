var express = require('express');
const passport = require('passport');
const User = require('./models/user');
const Token = require('./models/token')
const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const sendEmail = require('../public/javascripts/SendEmail');
const router = express.Router();

router.get('/', async function(req, res) {
  res.render('index');
});

router.get('/404', async function (req, res) {
res.render('404', {message: 'error'})

})
router.get('/signup', async function(req, res) {
  res.render('signup', { message: 'error'});
});

router.post('/signup', passport.authenticate('signup', {
  successRedirect: '/',
  successFlash: 'Cadastro feito com sucesso.',
  failureRedirect: '/signup',
})); 

router.get('/login', function(req, res) {
  res.render('login', {message: 'error'});
});

router.post('/login', passport.authenticate('login', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
    }));

function isAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }

  res.redirect('/login')
}
router.post('/lostpassword', async function (req, res) {
const email = req.body.email;
const user = await User.findOne({'email': email});
if (!user) {
req.flash('error', 'E-mail não registrado.');
res.redirect('/404')
}
else {
const tokentok = crypto.randomBytes(32).toString('hex')
const newToken = new Token ();
newToken.token = tokentok;
newToken.expires = 360000;
newToken.usermail = email;
await newToken.save();
const link = `https://pipokeeper.onrender.com/reset/${tokentok}`;
const html = `<b>Olá, ${user.username}!</b><p>Clique no link para resetar sua senha:</p><p>${link}</p>`
await sendEmail(email, html);
req.flash('success', 'E-mail de recuperação enviado.')
res.redirect('/login')
}

})
router.get('/reset/:token/', async function (req, res) {
const tokentok = req.params.token;
const token = await Token.findOne({token: tokentok});
if (!token) {
req.flash('error', 'Link expirado.');
res.redirect('/404')
}
 else {
  res.render('reset');
 }
})
router.post('/reset/:token/', async function (req, res) {
const newpass = req.body.password;
const tokentok = req.params.token;
const token = await Token.findOne({token: tokentok});
const mail = token.usermail;
const user = await User.findOne({email: mail});
user.password = bcrypt.hashSync(newpass, bcrypt.genSaltSync(10));
 user.save()
token.deleteOne()
req.flash('success', 'Senha modificada com sucesso.')
res.redirect('/login')
})
router.get('/dashboard', isAuthenticated, async (req, res, next) => {
const userid = req.user.id
const user = await User.findById(userid)
let keptpasses = user.keptpasses.map(val => val)
      res.render('dashboard', {keptpasses, user: req.user})
      });

router.post('/dashboard/account/delete', async function (req, res) {
const requser = req.user.id;
const user = await User.findOne({_id: requser});
user.deleteOne();
req.flash('success', 'Conta deletada com sucesso.')
res.redirect('/');
})
router.post('/logout', function(req, res) {
delete req.session;
res.redirect('/')
});

module.exports = router;