var express = require("express");
var router = express.Router();

router.get("/", function (req, res, next) {
  let sess = req.session;

  if (!sess.login) {
    res.redirect("/");
  }

  let login = sess.login;

  let item = { QRCode: req.query.room };

  global.db.findOneRoom(item, (err, room) => {
    if (err) {
      return console.log(err);
    }

    if (!room || room.length === 0) {
      let message = 'Nenhuma sala encontrada <a href=" / ">Voltar?</a>';
      res.send(message);
    }

    global.db.findAllCategories({}, (err, categories) => {
      if (err) {
        return console.log(err);
      }
      res.render("listequipment", { room, categories, login });
    });
  });
});

router.post("/", function (req, res, next) {
  let sess = req.session;

  let usuarioSess = sess.login;

  if (!sess.login) {
    res.redirect("/");
  }

  let problemas = [];
  let i = 0;

  if (req.body.recurso) {
    req.body.recurso.forEach((problema, index, arr) => {
      if (index % 3 === 0) {
        problemas.push({
          recurso: arr[0 + i],
          categoria: arr[1 + i],
          obs: arr[2 + i]
        });
        i += 3;
      }
    });
  }

  let item = {
    QRCode: req.body.QRCode,
    problemas,
    usuario: usuarioSess,
    data: new Date()
  };

  if (!sess.login) {
    res.redirect("/");
  }

  global.db.insertChecklist(item, (err, result) => {
    if (err) {
      return console.log(err);
    }
  });
  res.redirect("/consultqrcode");
});

module.exports = router;
