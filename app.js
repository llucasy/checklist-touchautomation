var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

var indexRouter = require("./routes/index");
var consultqrcodeRouter = require("./routes/consultqrcode");
var listequipmentRouter = require("./routes/listequipment");
var adminRouter = require("./routes/admin");
var usersRouter = require("./routes/users");
var roomsRouter = require("./routes/rooms");
var newroomRouter = require("./routes/newroom");
var changeroomRouter = require("./routes/changeroom");
var resourcesRouter = require("./routes/resources");
var changeresourceRouter = require("./routes/changeresource");
var qrcodeRouter = require("./routes/qrcode");
var xlsxRouter = require("./routes/xlsx");

var app = express();

//session
app.use(
  session({ secret: "sessionscret", saveUninitialized: true, resave: true })
);

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/consultqrcode", consultqrcodeRouter);
app.use("/listequipment", listequipmentRouter);
app.use("/admin", adminRouter);
app.use("/users", usersRouter);
app.use("/rooms", roomsRouter);
app.use("/newroom", newroomRouter);
app.use("/changeroom", changeroomRouter);
app.use("/resources", resourcesRouter);
app.use("/changeresource", changeresourceRouter);
app.use("/qrcode", qrcodeRouter);
app.use("/xlsx", xlsxRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
