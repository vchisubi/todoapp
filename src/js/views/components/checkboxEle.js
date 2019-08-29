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

Todolist.views.components.checkboxEle = (function(taskCompleted){
  'use strict';

  //Create checkbox element
  var checkboxEle = document.createElement("INPUT");
  checkboxEle.setAttribute('type', 'checkbox');
  checkboxEle.setAttribute('class', 'list-checkbox');

  if(taskCompleted === true){
    checkboxEle.checked = true;
  }

  return checkboxEle;
});