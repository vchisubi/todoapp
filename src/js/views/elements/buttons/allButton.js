var Todolist = Todolist || {
  enums: {},
  models: {},
  controllers: {},
  configs: {},
  utils: {},
  views: {
    components: {},
    inputs: {},
    pages: {
      main: {}
    }
  }
};

// Todolist.views.pages.main.allButton = (function() {
//   'use strict';

//   var allButton = document.getElementById("allButton");
//   allButton.addEventListener("click", function(event){
//     Todolist.views.updateList.rerender(Todolist.models.state.allTasks);
//   });

//   return {
//     getAllButton: function(){return allButton;}
//   };
// }());

Todolist.views.pages.main.allButton = (function() {
  'use strict';

  function init () {
    var allButton = document.getElementById("allButton");
    allButton.addEventListener("click", function(event){
      Todolist.views.updateList.rerender(Todolist.models.state.allTasks);
    });
  }

  return {
    getAllButton: function(){return allButton;},
    init: init
  };
});