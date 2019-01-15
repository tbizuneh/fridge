var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the fridges
  app.get("/api/fridges", function(req, res) {
    
    db.Fridge.findAll({}).then(function(dbFridge) {
      
      res.json(dbFridge);
    });
  });
   
     // POST route for saving a new items
  app.post("/api/fridges", function(req, res) {
    
    db.Fridge.create({
      item: req.body.item,
    }).then(function(dbFridge) {
    
      res.json(dbFridge);
    })
      .catch(function(err) {
      
        res.json(err);
      });
  });

  // DELETE route for deleting items. We can get the id of the items  to be deleted from
  // req.params.id
  app.delete("/api/fridges/:id", function(req, res) {
    
    db.Fridge.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbFridge) {
      res.json(dbFridge);
    });

  });
  // app.move("/api/fridges/:id", function(req, res) {
    
  //   db.Fridge.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbFridge) {
  //     res.json(dbFridge);
  //   });

  // });

  // updating fridges. 
  app.put("/api/fridges", function(req, res) {

    
    db.Fridge.update({
      item: req.body.item,
      // quantity:  req.body.quantity,
      complete: req.body.complete
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(dbFridge) {
      res.json(dbFridge);
    })
      .catch(function(err) {
      
        res.json(err);
      });
  });
};
