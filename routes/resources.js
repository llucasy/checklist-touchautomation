var express = require("express");
var router = express.Router();

router.get("/", (req, res) => {
  let sess = req.session;
  if (
    (sess.login !== process.env.ADMIN_L) &
    (sess.password !== process.env.ADMIN_P)
  ) {
    res.redirect("/");
  }

  global.db.countCategories({}, (e, count) => {
    if (e) {
      console.log(e);
    }
    global.db.findAllCategories({}, (e, docs) => {
      if (e) {
        console.log(e);
      }
      res.render("resources", { docs, count });
    });
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

  global.db.insertCategory(item, (e, r) => {
    if (e) {
      console.log(e);
    }
    res.redirect("/resources");
  });
});

module.exports = router;
