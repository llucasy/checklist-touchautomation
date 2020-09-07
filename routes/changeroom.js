var express = require("express");
var router = express.Router();
var ObjectId = require("mongodb").ObjectID;

router.get("/delete/:id", (req, res) => {
  let sess = req.session;
  if (
    (sess.login !== process.env.ADMIN_L) &
    (sess.password !== process.env.ADMIN_P)
  ) {
    res.redirect("/");
  }

  let id = req.params.id;

  global.db.deleteRoom(id, (e, r) => {
    if (e) {
      return console.log(e);
    }
    res.redirect("/rooms");
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

  var id = req.params.id;

  global.db.findOneRoom({ _id: new ObjectId(id) }, (e, room) => {
    if (e) {
      console.log(e);
    }

    res.render("changeroom", { room });
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

  let id = req.body.id;

  if (id) {
    global.db.updateRoom(id, item, (e, r) => {
      if (e) {
        console.log(e);
      }
      res.redirect("/rooms");
    });
  }
});

module.exports = router;
