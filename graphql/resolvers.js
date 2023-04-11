//creating Query and mutation  necessary for apollo server
const Recipe = require("../models/Recipe");
module.exports = {
  Query: {
    async recipe(_, { ID }) {
      return await Recipe.findById(ID);
    },
    async getRecipes(_, { amount }) {
      return await Recipe.find()
        .sort({
          createdAt: -1,
        })
        .limit(amount);
    },
  },
  Mutation: {
    async createRecipe(_, { recipeInput: { name, description } }) {
      const createRecipe = new Recipe({
        name: name,
        description: description,
        createdAt: new Date().toISOString(),
        thumsUp: 0,
        thumbsDown: 0,
      });

      const res = await createRecipe.save(); //mongodb saving
      //return result to the apollo server here
      return {
        id: res.id,
        ...res._doc,
      };
    },
    async deleteRecipe(_, { ID }) {
      const wasDeleted = (await Recipe.deleteOne({ _id: ID })).deletedCount;
      return wasDeleted; //1 if deleted  else 0
    },
    async editRecipe(_, { ID, recipeInput: { name, description } }) {
      const wasEdited = (
        await Recipe.updateOne(
          { _id: ID },
          { name: name, description: description }
        )
      ).modifiedCount;
      return wasEdited; //1 if edited  else 0
    },
  },
};
