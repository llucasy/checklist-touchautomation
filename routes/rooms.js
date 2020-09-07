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

  let item = {};

  if (req.query.search) {
    let re = new RegExp(`${req.query.search}`, "i");
    item = { QRCode: { $regex: re } };
  }

  global.db.countRooms(item, (e, countRooms) => {
    if (e) {
      console.log(e);
    }
    global.db.findAllRooms(item, (e, rooms) => {
      if (e) {
        console.log(e);
      }
      res.render("rooms", { rooms, countRooms });
    });
  });
});

module.exports = router;
