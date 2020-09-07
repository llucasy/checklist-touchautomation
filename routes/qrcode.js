var express = require("express");
var router = express.Router();

router.get("/:id", (req, res) => {
  res.render("qrcode", { qr: req.params.id });
});

module.exports = router;
