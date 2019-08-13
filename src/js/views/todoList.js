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

Todolist.views.pages.main = (function(){
  'use strict';

  function init(){

    Todolist.views.pages.main.todoContainer.getContainer();
    Todolist.views.pages.main.activeButton.getActiveButton();
    Todolist.views.pages.main.allButton.getAllButton();
    Todolist.views.pages.main.doneButton.getDoneButton();
    Todolist.views.pages.main.clearButton.getClearButton();

    //Creates the first Todolist instance and loads page with existing tasks
    document.addEventListener('DOMContentLoaded', (event) => {
      Todolist.controllers.dataModifier.updateAndSort().then((taskArray)=>{
        Todolist.views.updateList.rerender(taskArray);
      });
    }); 
  }
  return{
    init: init
  }
}());