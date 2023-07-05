const mongoose = require("mongoose");
const objectID = mongoose.Schema.Types.ObjectId;

const menuListSchema = new mongoose.Schema({
  name: { type: String },
  description: { type: String },
  ingridients: { type: Array },
  restaurantId: { type: objectID },
  image: { type: String },
  qty: { type: Number },
  price: { type: Number },
});

const menuListModel = mongoose.model("menuItems", menuListSchema, "menuitems");

module.exports = menuListModel;
