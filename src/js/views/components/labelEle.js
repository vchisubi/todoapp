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

Todolist.views.components.labelEle = (function(taskName){
  'use strict';

  //Create label element
  var labelEle = document.createElement("LABEL");
  var taskTextNode = document.createTextNode(taskName);
  labelEle.appendChild(taskTextNode);
  
  return labelEle;
});