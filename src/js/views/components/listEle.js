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

Todolist.views.components.listEle = (function(taskId){
  'use strict';

  //Create list element
  var listEle = document.createElement("LI");
  listEle.setAttribute('class', 'list-checkbox');
  listEle.setAttribute("data-list-id", taskId);  
  
  return listEle;
});