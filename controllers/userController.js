//const { Author } = require("../models/Author");
const { Article, Author, Comment } = require("../models");
// 1) Requerimos los paquetes que bajamos: npm i passport, npm i passport-local, npm i express-session
const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local");

// Display a listing of the resource.

// // Display a listing of the resource.
// async function index(req, res) {}

// // Display the specified resource.
// async function show(req, res) {}

// // Show the form for creating a new resource
// async function create(req, res) {}

// // Store a newly created resource in storage.
// async function store(req, res) {}

// // Show the form for editing the specified resource.
// async function edit(req, res) {}

// // Update the specified resource in storage.
// async function update(req, res) {}

// // Remove the specified resource from storage.
// async function destroy(req, res) {}

async function showRegister(req, res) {
  res.render("register");
}

async function showLogin(req, res) {
  res.render("login");
}


//Funcion de logout

async function showLogout(req, res, next){
  req.logout(function(err) {
    //if (err) { return next(err); }
    res.redirect('/');
  });
};


// Funcion del  metodo POST para el LOGIN
const postLogin = passport.authenticate("local", {
  successRedirect: "/admin",
  failureRedirect: "/login",
});

async function loginBcrypt(req,res){  // TODO LO QUE PRECISAMOS DE BCRIPT
  // Me muestra los datos ingresados cuando doy click al boton
  //console.log(req.body)
  const user = await User.findOne({where:{
      username: req.body.username}})
  //console.log(user.password);               La pw que le puse vs La pw hasheada en la db
  const isValidPassword = await bcrypt.compare(req.body.password, user.password)
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
  res.redirect("/")
}

module.exports = {
  showRegister,
  showLogin,
  postRegister,
  postLogin,
  showLogout
};
