var Todolist = Todolist || {
  enums: {},
  arrays: {},
  elements: {},
  configs: {},
  utils: {},
  views: {},
};

(function(app) {
  'use strict';

  //Creates the first Todolist instance and loads page with existing tasks
  document.addEventListener('DOMContentLoaded', (event) => {
    Todolist.utils.arrayHelper.updateAndSort().then((taskArray)=>{
      Todolist.utils.arrayHelper.rerender(taskArray);
    });
  });

}(Todolist));