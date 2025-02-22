const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://0.0.0.0:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create(data[0]).then((recipe) => {
      console.log("The recipe is saved and its title is: ", recipe.title);
      Recipe.deleteMany({ title: "Asian Glazed Chicken Thighs" }).then(
        (recipes) => {
          console.log("No documents: ", recipes);
        }
      );
    });
  })
  .then(() => {
    console.log("All the recipes are saved");
    return Recipe.insertMany(data).then(() => {});
  })
  .then(() => {
    Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 }
    ).then(() => {
      console.log("The duration has been updated!");
    });
    return Recipe.deleteOne({ title: "Carrot Cake" }).then(() => {});
  })
  .then(() => {
    console.log("Sorry! Carrot Cake is no longer avaible...");
    mongoose.connection.close(() => {
      console.log("DISCONNECTED!");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
