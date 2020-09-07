var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  let sess = req.session;

  if (!sess.login) {
    res.redirect("/");
  }

  let login = sess.login;

  let item = {};

  global.db.findAllRooms(item, (e, docs) => {
    if (e) {
      return console.log(e);
    }

    res.render("consultqrcode", { login, docs });
  });
});

router.post("/", function (req, res, next) {
  let sess = req.session;

  if (!sess.login) {
    res.redirect("/");
  }

  let login = sess.login;

  let item = {};

  global.db.findAllRooms(item, (e, docs) => {
    if (e) {
      return console.log(e);
    }

    res.render("consultqrcode", { login, docs });
  });
});

module.exports = router;
