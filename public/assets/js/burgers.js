//this is where the front end jQuery will run from 


$(function() {
    $(".change-eat").on("click", function(event) {
      let id = $(this).data("id");
      let newEat = $(this).data("newEat");
  
      let newEatStatus = {
        devoured: newEat
      };
  
      // Send the PUT request.
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: newEatStatus
      }).then(
        function() {
          console.log("changed status to", newEat);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      // added because of submit button
      event.preventDefault();
  
      let newBurger = {
        name: $("#burg").val().trim(),
        
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
  
    
  });
  