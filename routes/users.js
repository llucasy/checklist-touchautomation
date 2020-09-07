var express = require("express");
var router = express.Router();

router.get("/delete/:id", function (req, res) {
  let sess = req.session;
  if (
    (sess.login !== process.env.ADMIN_L) &
    (sess.password !== process.env.ADMIN_P)
  ) {
    res.redirect("/");
  }

  let id = req.params.id;

  global.db.deleteOneUser(id, (e, r) => {
    if (e) {
      return console.log(e);
    }
    res.redirect("/users");
  });
});

router.get("/", (req, res) => {
  let sess = req.session;
  if (
    (sess.login !== process.env.ADMIN_L) &
    (sess.password !== process.env.ADMIN_P)
  ) {
    res.redirect("/");
  }

  global.db.findAllUsers({}, (e, docs) => {
    if (e) {
      return console.log(e);
    }

    res.render("users", { docs });
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

  let item = { login: req.body.login, password: req.body.password };

  global.db.insertUser(item, (e, r) => {
    if (e) {
      console.log(e);
    }

    res.redirect("/users");
  });
});

module.exports = router;
