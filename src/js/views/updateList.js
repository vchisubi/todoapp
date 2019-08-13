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

Todolist.views.updateList = (function() {
  'use strict';

  function rerender(inputArray){

    Todolist.views.pages.main.todoContainer.getContainer().innerHTML = '';

    var listWrapperUL = document.createElement('UL');

    inputArray.forEach(function (todoItem, index){
      //create the taskItem
      var listEle = new Todolist.views.components.taskItem(todoItem);
      listWrapperUL.appendChild(listEle.getListElement());

    })
    Todolist.views.pages.main.todoContainer.getContainer().appendChild(listWrapperUL);
  }

  return {
    rerender: rerender
  };
}());