var express = require("express");
var router = express.Router();

router.get("/delete/:id", (req, res) => {
  let sess = req.session;
  if (
    (sess.login !== process.env.ADMIN_L) &
    (sess.password !== process.env.ADMIN_P)
  ) {
    res.redirect("/");
  }

  global.db.deleteCategory(req.params.id, (e, r) => {
    if (e) {
      return console.log(e);
    }
    res.redirect("/resources");
  });
});

router.get("/:id", (req, res) => {
  let sess = req.session;
  if (
    (sess.login !== process.env.ADMIN_L) &
    (sess.password !== process.env.ADMIN_P)
  ) {
    res.redirect("/");
  }

  let id = req.params.id;

  global.db.findOneCategory(id, (e, resource) => {
    if (e) {
      console.log(e);
    }
    res.render("changeresource", { resource });
  });
});

router.post("/", (req, res) => {
  let sess = req.session;
  if (
    (sess.login !== process.env.ADMIN_L) &
    (sess.password !== process.env.ADMIN_P)
  ) {
    res.redirect("/");
  }

  let subCategories = [];
  let i = 0;

  if (Array.isArray(req.body.subCategories)) {
    req.body.subCategories.forEach((subCategory, index, arr) => {
      subCategories.push({
        subCategory: arr[0 + i]
      });
      i += 1;
    });
  } else {
    subCategories = [{ subCategory: req.body.subCategories }];
  }

  let item = { category: req.body.category, subCategories };

  global.db.updateCategory(req.body.id, item, (e, r) => {
    res.redirect("/resources");
  });
});

module.exports = router;
