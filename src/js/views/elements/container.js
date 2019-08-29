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

Todolist.views.pages.main.todoContainer = (function(){
  'use strict';

  var todoContainer = document.getElementById("divContainer");

  return {
    getContainer: function(){return todoContainer;}
  };
}());