var Todolist = Todolist || {
  enums: {},
  arrays: {},
  elements: {},
  configs: {},
  utils: {},
  views: {},
};

Todolist.views.viewTasks = (function() {
  'use strict';

  //call the showAll method when the showAll button is clicked
  Todolist.elements.htmlElements.allButton.addEventListener("click", function(event){
    Todolist.utils.arrayHelper.rerender(Todolist.arrays.globalArrays.allTasks);
  });

  //call the showActive method when the showActive button is clicked
  Todolist.elements.htmlElements.activeButton.addEventListener("click", function(event){
    Todolist.utils.arrayHelper.updateActiveTasks();
    Todolist.utils.arrayHelper.rerender(Todolist.arrays.globalArrays.activeTasks);
  });

  //call the showDone method when the showDone button is clicked
  Todolist.elements.htmlElements.doneButton.addEventListener("click", function(event){
    Todolist.utils.arrayHelper.updateCopmpletedTasks();
    Todolist.utils.arrayHelper.rerender(Todolist.arrays.globalArrays.doneTasks);
  });

  //Clear all tasks from the API and the webpage
  Todolist.elements.htmlElements.clearButton.addEventListener("click", function(event){
    Todolist.utils.apiHelper.handleRequest('DELETE', Todolist.configs.api.url).then(()=>{
      Todolist.elements.htmlElements.todoContainer.innerHTML = '';
      Todolist.arrays.globalArrays.allTasks = [];
      Todolist.arrays.globalArrays.activeTasks = [];
      Todolist.arrays.globalArrays.doneTasks = [];
    });
  });
}());