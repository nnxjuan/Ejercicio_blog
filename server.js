require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const dbInitialSetup = require("./dbInitialSetup");
const APP_PORT = process.env.APP_PORT || 3000;
const app = express();

// Modulos de Passport.js
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const { Author, UserRole, Role } = require("./models/index");
// 2)
app.use(
  session({
    secret: "AlgúnTextoSuperSecreto",
    resave: false,
    saveUninitialized: false,
  })
);
// 3) Es importante que esto se ejecute luego del middleware session anterior
app.use(passport.session());
// 4) Ejemplo de Estrategia Local usando Sequelize y Bcrypt
passport.use(
  new LocalStrategy({ usernameField: "email" }, async (email, password, cb) => {
    try {
      const user = await Author.findOne({ where: { email } });
      if (!user) {
        console.log("Nombre de usuario no existe.");
        return cb(null, false, { message: "Credenciales incorrectas." });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        console.log("La contraseña es inválida.");
        return cb(null, false, { message: "Credenciales incorrectas." });
      }
      console.log("Credenciales verificadas correctamente");
      return cb(null, user);
    } catch (error) {
      cb(error);
    }
  })
);

passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(async function (id, cb) {
  try {
    const user = await Author.findByPk(id);
    cb(null, user); // req.user
  } catch (error) {
    cb(error);
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");
routes(app);

app.listen(3000, () => console.log("Probando puerto"));
