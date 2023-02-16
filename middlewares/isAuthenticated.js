function isAuthenticated(req,res,next) {
  if (req.isAuthenticated()) {
    next() // Se hace el render de admin
  } else {
    res.redirect("/login");
  }
}



module.exports =  isAuthenticated

  