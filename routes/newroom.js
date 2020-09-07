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

  global.db.findAllCategories({}, (e, categories) => {
    if (e) {
      console.log(e);
    }
    res.render("newroom", { categories });
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

  let recursos = [];
  let i = 0;

  if (req.body.recurso) {
    req.body.recurso.forEach((problema, index, arr) => {
      if (index % 2 === 0) {
        recursos.push({
          recurso: arr[0 + i],
          qt: arr[1 + i]
        });
        i += 2;
      }
    });
  }

  let item = {
    edificio: req.body.edificio,
    tipo: req.body.tipo,
    numero: req.body.numero,
    QRCode: req.body.QRCode,
    recursos
  };

  global.db.insertRoom(item, (e, r) => {
    if (e) {
      console.log(e);
    }
    res.redirect("/rooms");
  });
});

module.exports = router;
