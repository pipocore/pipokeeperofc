const express = require('express')
const dashboard = express.Router()
const bcrypt = require('bcryptjs');
const generator = require('generate-password-browser');
const User = require('./models/user');

dashboard.get('/account', async function (req, res) {
userid = req.user.id
const user = await User.findById(userid)
res.render('account', {user: user})

})
dashboard.post('/account/updateuser', async function (req, res) {
const newusername = req.body.username;
const requser = req.user.id;
const user = await User.findOne({_id: requser});
if (newusername === user.username) {
req.flash('error', 'Novo nome de usuáro deve ser diferente da anterior.')
res.redirect('/dashboard/account')
}
else {
user.username = newusername;
user.save();
res.redirect('/dashboard/account')
}
})
dashboard.post('/account/updatemail', async function (req, res) {
const newmail = req.body.email;
const requser = req.user.id;
const user = await User.findOne({_id: requser});
if (newmail === user.email) {
req.flash('error', 'Novo e-mail deve ser diferente do anterior.')
res.redirect('/dashboard/account')
}
else {
user.email = newmail;
user.save();
res.redirect('/dashboard/account')
}
})
dashboard.post('/account/updatepass', async function (req, res) {
const newpass = req.body.password;
const requser = req.user.id;
const user = await User.findOne({_id: requser});
if (user.comparePassword(newpass)) {
req.flash('error', 'Nova senha deve ser diferente da anterior.')
res.redirect('/dashboard/account')
}
else {
user.password = bcrypt.hashSync(newpass, bcrypt.genSaltSync(10));
user.save();
res.redirect('/dashboard/account')
}
})
dashboard.get('/gerador', function(req, res) {
res.render('gerador', {user: req.user})
});
dashboard.post('/nova', async function(req, res) {
const title = req.body.title
const userid = req.user.id
const pass = req.body.pass
const username = req.body.username
await User.findOneAndUpdate(
{ _id: userid },
{$push: {
keptpasses: [{
'title': title,
'pass': pass,
'usernametokeep': username
}]
}
}
)
res.redirect('/dashboard')
})
dashboard.post('/gera', async function (req, res) {
const length = req.body.length
const uppercase = Boolean(req.body.mai)
const lowercase = Boolean(req.body.mi)
const numbers = Boolean(req.body.nu)
const symbols = Boolean(req.body.esp)
const check = uppercase + lowercase + numbers + symbols;
if (!check) {
req.flash('Marque ao menos um campo.')
res.redirect('/dashboard/gerador')
}
else {
var password = generator.generate({
	length: length,
	numbers: numbers,
	uppercase: uppercase,
	lowercase: lowercase,
	symbols: symbols
});
res.render('gerador', {resul: password})
}
});
dashboard.post('/:id', async function (req, res) {
const id = req.params.id
const userid = req.user.id
await User.findOneAndUpdate(
{ _id: userid },
{$pull: {
keptpasses: {
'_id': id
}
}
}
)
res.redirect('/dashboard')
})
module.exports = dashboard;