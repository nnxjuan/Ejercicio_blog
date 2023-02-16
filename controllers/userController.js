const { Article, Author, Comment, Role, UserRole } = require("../models");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local");

async function showRegister(req, res) {
  res.render("register");
}

async function showLogin(req, res) {
  res.render("login");
}

async function showLogout(req, res, next) {
  req.logout(function (err) {
    //if (err) { return next(err); }
    res.redirect("/");
  });
}

// Funcion del  metodo POST para el LOGIN
const postLogin = passport.authenticate("local", {
  successRedirect: "/admin",
  failureRedirect: "/login",
});

async function loginBcrypt(req, res) {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  console.log(isValidPassword); //No matchea: false, Si matchea: true
}

async function postRegister(req, res) {
  const passwordParaHashear = req.body.password;
  const passwordHasheado = await bcrypt.hash(passwordParaHashear, 10);

  const nuevoUsuario = await Author.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    username: req.body.username,
    password: passwordHasheado,
  });
  res.redirect("/");
}

module.exports = {
  showRegister,
  showLogin,
  postRegister,
  postLogin,
  showLogout,
};
