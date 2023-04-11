const { model, Schema } = require("mongoose");
const recipeSchema = new Schema({
  name: String,
  description: String,
  createAt: String,
  thumsUp: Number,
  thumsDown: Number,
});
module.exports = model("Recipe", recipeSchema);
