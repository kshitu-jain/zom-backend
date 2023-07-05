const mongoose = require("mongoose");

const mealTypeSchema = new mongoose.Schema({
  name: { type: String },
  content: { type: String },
  image: { type: String },
  meal_type: { type: Number },
});

const mealTypeModel = mongoose.model("mealType", mealTypeSchema, "mealtypes");

module.exports = mealTypeModel;
