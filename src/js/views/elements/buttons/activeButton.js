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

Todolist.views.pages.main.activeButton = (function() {
  'use strict';

  var activeButton = document.getElementById("activeButton");
  activeButton.addEventListener("click", function(event){
    Todolist.controllers.dataModifier.updateActiveTasks();
    Todolist.views.updateList.rerender(Todolist.models.state.activeTasks);
  });

  return {
    getActiveButton: function(){return activeButton;}
  };
}());
