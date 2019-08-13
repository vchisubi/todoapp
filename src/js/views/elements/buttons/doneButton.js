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

Todolist.views.pages.main.doneButton = (function() {
  'use strict';
  var doneButton = document.getElementById("doneButton");
  doneButton.addEventListener("click", function(event){
    Todolist.controllers.dataModifier.updateCompletedTasks();
    Todolist.views.updateList.rerender(Todolist.models.state.doneTasks);
  });
  
  return {
    getDoneButton: function(){return doneButton;}
  };
}());