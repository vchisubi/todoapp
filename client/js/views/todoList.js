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

    var activeButton = Todolist.views.pages.main.activeButton();
    activeButton.init();

    var allButton = Todolist.views.pages.main.allButton();
    allButton.init();

    var clearButton = Todolist.views.pages.main.clearButton();
    clearButton.init();

    var doneButton = Todolist.views.pages.main.doneButton();
    doneButton.init();


    //Creates the first Todolist instance and loads page with existing tasks
    document.addEventListener('DOMContentLoaded', (event) => {
      Todolist.controllers.dataModifier.updateAndSort().then((taskArray)=>{
        Todolist.views.updateList.rerender(taskArray);
      });
    }); 
  }

  return{
    init: init
  };
}());