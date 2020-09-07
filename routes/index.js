var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  var message = "";

  let sess = req.session;

  if (sess.login) {
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
    });
  }

  res.render("index", { message });
});

router.post("/", function (req, res, next) {
  var message = "";
  let sess = req.session;

  let login = {};

  if (req.body.login) {
    login = { login: req.body.login };
  }

  let item = { ...login };

  global.db.findAllUsers(item, (e, docs) => {
    if (e) {
      return console.log(e);
    }
    if (req.body.login === process.env.ADMIN_L) {
      if (req.body.password === process.env.ADMIN_P) {
        sess.login = req.body.login;
        sess.password = req.body.password;
        message = "";
        res.redirect("/admin");
      } else {
        message = "Senha incorreta";
        res.render("index", { message });
      }
    } else {
      if (!docs || docs.length === 0) {
        message = "Usuário não cadastrado";
        res.render("index", { message });
      } else {
        docs.forEach((users) => {
          if (req.body.password === users.password) {
            sess.login = req.body.login;
            message = "";
            res.redirect("/consultqrcode");
          } else {
            message = "Senha incorreta";
            res.render("index", { message });
          }
        });
      }
    }
  });
});

module.exports = router;
