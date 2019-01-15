$(document).ready(function() {
    // Getting a reference to the input field where user adds a new item
    var $newItemInput = $("input.new-item");
    // Our new items will go inside the fridgeContainer
    var $fridgeContainer = $("#shopping-List");
    var $fridgeitem = $("#Fridge-items")
    // Adding event listeners for deleting, editing, and adding items
    $(document).on("click", "button.delete", deleteFridge);
    $(document).on("click", ".fridge-item", editFridge);
    $(document).on("keyup", ".fridge-item", finishEdit);
    $(document).on("blur", ".fridge-item", cancelEdit);
    $(document).on("submit", "#fridge-form", insertFridge);

    
  
    // Our initial items array
    var fridges = [];
  
    // Getting items from database when page loads
    getFridges();
  
    
    function initializeRows() {
      $fridgeContainer.empty();
      var rowsToAdd = [];
      for (var i = 0; i < fridges.length; i++) {
        rowsToAdd.push(createNewRow(fridges[i]));
      }
      $fridgeContainer.prepend(rowsToAdd);
    }
  
    // This function grabs items from the database and updates the view
    function getFridges() {
      $.get("/api/fridges", function(data) {
        fridges = data;
        initializeRows();
      });
    }
    
    // This function deletes an item when the user clicks the delete button
        
   
   
    function deleteFridge() {
      event.stopPropagation();
      var id = $(this).data("id");
      $.ajax({
        method: "DELETE",
        url: "/api/fridges/" + id
      }).then(getFridges);
    }
    
  
    // This function handles showing the input box for a user to edit an item
    function editFridge() {
      var currentFridge = $(this).data("fridge");
      $(this).children().hide();
      $(this).children("input.edit").val(currentFridge.item);
      $(this).children("input.edit").show();
      $(this).children("input.edit").focus();
    }
  
   
    
    function finishEdit(event) {
      var updatedFridge = $(this).data("fridge");
      if (event.which === 13) {
        updatedFridge.item = $(this).children("input").val().trim();
        $(this).blur();
        updateFridge(updatedFridge);
      }
    }
    
  
  
    function updateFridge(fridge) {
      $.ajax({
        method: "PUT",
        url: "/api/fridges",
        data: fridge
      }).then(getFridges);
    }
  
  
    function cancelEdit() {
      var currentFridge = $(this).data("fridge");
      if (currentFridge) {
        $(this).children().hide();
        $(this).children("input.edit").val(currentFridge.id);
        $(this).children("span").show();
        $(this).children("button").show();
      }
    }
  
    // This function constructs a fridge-item row
    function createNewRow(fridge) {
      var $newInputRow = $(
        [
          
          "<li class='list-group-item fridge-item'>",
          "<span>",
          fridge.item,
          "</span>",
          "<input type='text' class='edit' style='display: none;'>",
          "<button class='delete btn btn-danger'>delete</button>",
          "<button class='move btn btn-success'>Move</button>",
           "</li>"
        ].join("")
      );
  
      $newInputRow.find("button.delete").data("id", fridge.id);
      $newInputRow.find("button.move").data("id", fridge.id);
      $newInputRow.find("input.edit").css("display", "none");
      $newInputRow.data("fridge", fridge);
      
      return $newInputRow;
    }
  
    // This function inserts a new item into our database 
    function insertFridge(event) {
      event.preventDefault();
      var fridge = {
        item: $newItemInput.val().trim(),

      };
  
      $.post("/api/fridges", fridge, getFridges);
      $newItemInput.val("");
    }
  });
  