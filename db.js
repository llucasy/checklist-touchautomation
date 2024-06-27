var mongoClient = require("mongodb").MongoClient;
var ObjectId = require("mongodb").ObjectID;
require('dotenv/config');

mongoClient
  .connect(
    "mongodb+srv://" +
      process.env.DB_LOGIN +
      ":" +
      process.env.DB_PASSWORD +
      "@cluster0.deniqpn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
    { useUnifiedTopology: true }
  )
  .then((conn) => (global.conn = conn.db("checklist")))
  .catch((err) => console.log(err));

function findAllUsers(item, callback) {
  global.conn
    .collection("users")
    .find(item)
    .sort({ login: 1 })
    .toArray(callback);
}

function deleteOneUser(id, callback) {
  global.conn
    .collection("users")
    .deleteOne({ _id: new ObjectId(id) }, callback);
}

function insertUser(item, callback) {
  global.conn.collection("users").insert(item, callback);
}

function countRooms(item, callback) {
  global.conn.collection("rooms").countDocuments(item, {}, callback);
}

function findAllRooms(item, callback) {
  global.conn.collection("rooms").find(item).toArray(callback);
}

function findOneRoom(id, callback) {
  global.conn.collection("rooms").findOne(id, callback);
}

function insertRoom(item, callback) {
  global.conn.collection("rooms").insert(item, callback);
}

function updateRoom(id, item, callback) {
  global.conn
    .collection("rooms")
    .update({ _id: new ObjectId(id) }, item, callback);
}

function deleteRoom(id, callback) {
  global.conn
    .collection("rooms")
    .deleteOne({ _id: new ObjectId(id) }, callback);
}

function countCategories(item, callback) {
  global.conn.collection("categories").countDocuments(item, {}, callback);
}

function findAllCategories(item, callback) {
  global.conn.collection("categories").find(item).toArray(callback);
}

function findOneCategory(id, callback) {
  global.conn
    .collection("categories")
    .findOne({ _id: new ObjectId(id) }, callback);
}

function insertCategory(item, callback) {
  global.conn.collection("categories").insert(item, callback);
}

function updateCategory(id, item, callback) {
  global.conn
    .collection("categories")
    .update({ _id: new ObjectId(id) }, item, callback);
}

function deleteCategory(id, callback) {
  global.conn
    .collection("categories")
    .deleteOne({ _id: new ObjectId(id) }, callback);
}

function insertChecklist(item, callback) {
  global.conn.collection("checklists").insert(item, callback);
}

function findAllChecklist(limit, item, callback) {
  global.conn
    .collection("checklists")
    .find(item)
    .limit(limit)
    .sort({ data: -1 })
    .toArray(callback);
}

function countChecklist(item, callback) {
  global.conn.collection("checklists").countDocuments(item, {}, callback);
}

function removeAllChecklist(callback) {
  global.conn.collection("checklists").remove({}, callback);
}

module.exports = {
  findAllUsers,
  deleteOneUser,
  insertUser,
  countRooms,
  findAllRooms,
  findOneRoom,
  insertRoom,
  updateRoom,
  deleteRoom,
  countCategories,
  findAllCategories,
  findOneCategory,
  insertCategory,
  updateCategory,
  deleteCategory,
  insertChecklist,
  findAllChecklist,
  countChecklist,
  removeAllChecklist
};
