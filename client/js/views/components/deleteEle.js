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

Todolist.views.components.deleteEle = (function(taskName){
  'use strict';

  //Create label element
  var deleteEle = document.createElement("SPAN");
  deleteEle.setAttribute('class', 'obliterate');
  
  return deleteEle;
});