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

// Todolist.views.pages.main.clearButton = (function() {
//   'use strict';

//   var clearButton = document.getElementById("clearButton");
//   clearButton.addEventListener("click", function(event){
//     Todolist.utils.apiHelper.handleRequest('DELETE', Todolist.configs.api.url).then(()=>{
//       Todolist.views.pages.main.todoContainer.getContainer().innerHTML = '';
//       Todolist.models.state.allTasks = [];
//       Todolist.models.state.activeTasks = [];
//       Todolist.models.state.doneTasks = [];
//     });
//   });

//   return {
//     getClearButton: function(){return clearButton;}
//   };
// }());

Todolist.views.pages.main.clearButton = (function() {
  'use strict';

  function init () {
    var clearButton = document.getElementById("clearButton");
    clearButton.addEventListener("click", function(event){
      Todolist.utils.apiHelper.handleRequest('DELETE', Todolist.configs.api.url).then(()=>{
        Todolist.views.pages.main.todoContainer.getContainer().innerHTML = '';
        Todolist.models.state.allTasks = [];
        Todolist.models.state.activeTasks = [];
        Todolist.models.state.doneTasks = [];
      });
    });
  }
  
  return {
    getClearButton: function(){return clearButton;},
    init: init
  };
});