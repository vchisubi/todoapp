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

Todolist.views.components.taskItem = (function(todoItem){
  'use strict';

  var taskName = todoItem.title;
  var taskCompleted = todoItem.completed;
  var taskId = todoItem.id;

  //Create list element
  var listEle = new Todolist.views.components.listEle(taskId);
  
  //Create checkbox element
  var checkboxEle = new Todolist.views.components.checkboxEle(taskCompleted);
 
  checkboxEle.addEventListener('change', function(event){       
    if(taskCompleted === true){
      todoItem.completed = false;
      Todolist.controllers.dataModifier.patchTask(taskId, false);
    }
    else{
      todoItem.completed = true;
      Todolist.controllers.dataModifier.patchTask(taskId, true);
    }
  });

  //Create label element to store the task that the user inputted
  var taskEle = Todolist.views.components.labelEle(taskName);

  //Create span element for deletion
  var deleteEle = Todolist.views.components.deleteEle();
  deleteEle.addEventListener('click', function(event){
    Todolist.controllers.dataModifier.obliterateTask(taskId);
  });
  var closeChar = document.createTextNode('\u00D7');
  deleteEle.appendChild(closeChar);

  //Append all elements to the list element
  listEle.appendChild(checkboxEle);
  listEle.appendChild(taskEle);
  listEle.appendChild(deleteEle);

  return {
    getListElement: function(){return listEle;}
  };
});