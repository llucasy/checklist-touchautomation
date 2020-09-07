var express = require("express");
var router = express.Router();
var xlsx = require("xlsx");
var sheet = require("../sheet");

router.get("/delete", (req, res) => {
  global.db.removeAllChecklist((e, r) => {
    if (e) {
      console.log(e);
    }
  });

  res.redirect("/xlsx");
});

router.get("/", (req, res) => {
  let sess = req.session;

  if (
    (sess.login !== process.env.ADMIN_L) &
    (sess.password !== process.env.ADMIN_P)
  ) {
    res.redirect("/");
  }

  let item = {};

  global.db.countChecklist(item, (e, totalChecklist) => {
    if (e) {
      console.log(e);
    }
    res.render("xlsx", { totalChecklist });
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

  if (!req.body.initialDate & !req.body.finalDate) {
    global.db.findAllChecklist(0, {}, (e, checklists) => {
      if (e) {
        console.log(e);
      }
      global.db.findAllRooms({}, (er, rooms) => {
        if (er) {
          console.log(er);
        }
        let dataSheet = sheet.noDate(checklists, rooms, req.body.genericMode);

        let newWB = xlsx.utils.book_new();
        let newWS = xlsx.utils.json_to_sheet(dataSheet);
        xlsx.utils.book_append_sheet(newWB, newWS, "Checklists");

        xlsx.writeFile(newWB, "public/checklists.xlsx");

        res.redirect("/checklists.xlsx");
      });
    });
  } else {
    function formatarValor(dados) {
      let d = new Date(dados);
      d.setHours(d.getHours() + 3);
      return d;
    }

    let item = {
      data: {
        $gte: formatarValor(req.body.initialDate),
        $lt: formatarValor(req.body.finalDate)
      }
    };

    global.db.findAllChecklist(0, item, (e, checklists) => {
      if (e) {
        console.log(e);
      }
      global.db.findAllRooms({}, (er, rooms) => {
        if (er) {
          console.log(er);
        }
        let dataSheet = sheet.noDate(checklists, rooms, req.body.genericMode);

        let newWB = xlsx.utils.book_new();
        let newWS = xlsx.utils.json_to_sheet(dataSheet);
        xlsx.utils.book_append_sheet(newWB, newWS, "Checklists");

        xlsx.writeFile(newWB, "public/checklists.xlsx");

        res.redirect("/checklists.xlsx");
      });
    });
  }
});

module.exports = router;
