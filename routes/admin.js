var express = require("express");
var router = express.Router();
var moment = require("moment");

moment.locale("pt-BR");

function formatarValor(dados) {
  return moment(dados).utcOffset(-3).calendar();
}

router.get("/", function (req, res, next) {
  let sess = req.session;

  if (
    (sess.login !== process.env.ADMIN_L) &
    (sess.password !== process.env.ADMIN_P)
  ) {
    res.redirect("/");
  }

  global.db.findAllChecklist(50, {}, (err, checklists) => {
    if (err) {
      return console.log(err);
    }

    res.render("admin", { checklists, formatarValor });
  });
});

module.exports = router;
