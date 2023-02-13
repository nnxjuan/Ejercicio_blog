const { Article, Author, Comment } = require("../models/indexSeq");

// Display a listing of the resource.
const today = new Date();
async function index(req, res) {
  const articles = await Article.findAll({
    order: [["date", "DESC"]],
    include: Author,
  });

  res.render("home", { articles });
}

// Display the specified resource.
async function show(req, res) {
  const { id } = req.params;

  const comments = await Comment.findAll({
    where: { articleId: `${id}` },
    order: [["date", "DESC"]],
    include: Article,
  });
  const article = await Article.findByPk(id, { include: Author });
  res.render("article", { article, comments });
}
async function admin(req, res) {
  const articles = await Article.findAll({
    order: [["date", "DESC"]],
    include: Author,
  });
  console.log(articles);
  res.render("admin", { articles });
}

// Show the form for creating a new resource
async function create(req, res) {
  res.render("create");
}

// Store a newly created resource in storage.
async function store(req, res) {
  const rBody = req.body;
  await Article.create({
    title: req.body.title,
    content: req.body.content,
    img: req.body.image,
    date: today,
    authorId: 1,
  });

  return res.redirect("/");
}

// Show the form for editing the specified resource.
async function edit(req, res) {
  const { id } = req.params;
  const article = await Article.findByPk(id, { include: Author });
  res.render("edit", { article });
}

// Update the specified resource in storage.
async function update(req, res) {
  const { id } = req.params;
  const rBody = req.body;
  await Article.update(
    {
      title: req.body.title,
      content: req.body.content,
      img: req.body.image,
    },
    {
      where: {
        id: `${id}`,
      },
    }
  );
  return res.redirect("/admin");
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  const { id } = req.params;
  await Article.destroy({ where: { id: `${id}` }, include: Author });
  return res.redirect("/admin");
}
async function createComment(req, res) {
  const rBody = req.body;
  const { id } = req.params;
  await Comment.create({
    name: req.body.name,
    text: req.body.text,
    name: req.body.name,
    date: today,
    articleId: `${id}`,
    include: Article,
  });

  return res.redirect(`/article/${id}`);
}
// Otros handlers...
// ...

module.exports = {
  index,
  show,
  admin,
  create,
  createComment,
  store,
  edit,
  update,
  destroy,
};
