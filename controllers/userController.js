//const { Author } = require("../models/Author");
const { Article, Author, Comment } = require("../models");

const bcrypt = require("bcryptjs");

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

async function postRegister(req, res) {
  const passwordParaHashear = req.body.password;
  const passwordHasheado = await bcrypt.hash(passwordParaHashear, 10);

  const nuevoUsuario = await Author.create({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: passwordHasheado,
  });
  res.redirect("/")
}

module.exports = {
  showRegister,
  showLogin,
  postRegister,
};
