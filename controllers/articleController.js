const { Article, Author, Comment } = require("../models");
const formidable = require("formidable");

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

  res.render("admin", { articles });
}

// Show the form for creating a new resource
async function create(req, res) {
  res.render("create");
}

// Store a newly created resource in storage.
async function store(req, res) {
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    await Article.create({
      title: fields.title,
      content: fields.content,
      img: files.image.newFilename,
      date: today,
      authorId: req.user.id,
    });

    res.redirect("/");
  });
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
  const article = await Article.findByPk(id, { include: Author });
  const form = formidable({
    multiples: true,
    uploadDir: __dirname + "/../public/img",
    keepExtensions: true,
  });
  if (
    (req.user.role.code === 200 && article.authorId === req.user.id) ||
    req.user.role.code >= 300
  ) {
    form.parse(req, async (err, fields, files) => {
      if (files.img.size === 0) {
        await Article.update(
          {
            title: fields.title,
            content: fields.content,
            img: article.img,
          },
          {
            where: {
              id: `${id}`,
            },
          }
        );
      } else {
        await Article.update(
          {
            title: fields.title,
            content: fields.content,
            img: files.img.newFilename,
          },
          {
            where: {
              id: `${id}`,
            },
          }
        );
      }
    });
    return res.redirect("/privado/admin");
  } else {
    res.send("No tiene permisos");
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  // const { id } = req.params;
  const article = Article.findByPk(req.params.articleId, { include: Author });
  if (
    (req.user.role.code === 300 && article.authorId === req.user.id) ||
    req.user.role.code === 400
  ) {
    await article.destroy();
    return res.redirect("/admin");
  } else {
    return res.send("No tiene permisos  para esa acción");
  }
}
async function createComment(req, res) {
  const { id } = req.params;
  await Comment.create({
    name: req.body.name,
    text: req.body.text,

    date: today,
    articleId: `${id}`,
    include: Article,
  });

  return res.redirect(`/article/${id}`);
}
async function editComment(req, res) {
  const { id } = req.params;
  const comment = await Comment.findByPk(id, { include: Article });

  res.render("editComment", { comment });
}
async function updateComment(req, res) {
  const { id } = req.params;

  const comment = await Comment.findByPk(id);
  await Comment.update(
    {
      name: req.body.name,
      text: req.body.text,
    },

    {
      where: {
        id: `${id}`,
      },
    }
  );

  return res.redirect(`/article/${comment.articleId}`);
}

module.exports = {
  index,
  show,
  admin,
  create,
  createComment,
  editComment,
  updateComment,
  store,
  edit,
  update,
  destroy,
};
