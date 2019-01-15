var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Recipe.findAll({}).then(function(dbRecipes) {
      res.render("index", {
        msg: "Welcome!",
        recipe: dbRecipes
      });
    });
  });

  //Load Fridge page
  app.get("/fridge", function(req, res) {
    db.Fridge.findAll({}).then(function(dbFridge) {
      res.render("fridge", {
        fridge: dbFridge
      });
    });
  });

  //Load Recipe Results page
  app.get("/recipes", function(req, res) {
    //replace line below with correct database query
    db.Recipe.findAll({}).then(function(dbRecipes) {
      res.render("recipes", {
        //replace lines below with correct info
        msg: "Welcome!",
        recipes: dbRecipes
      });
    });
  });

  // Load recipe page and pass in an recipe by id
  app.get("/recipe/:id", function(req, res) {
    db.Recipe.findOne({ where: { id: req.params.id } }).then(function(dbRecipe) {
      res.render("recipe", {
        recipe: dbRecipe
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
