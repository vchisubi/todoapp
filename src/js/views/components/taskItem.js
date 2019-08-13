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
  var listEle = document.createElement("LI");
  listEle.setAttribute('class', 'list-checkbox');
  listEle.setAttribute("data-list-id", taskId);  
  
  //Create checkbox element
  var checkboxEle = document.createElement("INPUT");
  checkboxEle.setAttribute('type', 'checkbox');
  checkboxEle.setAttribute('class', 'list-checkbox');

  if(taskCompleted === true){
    checkboxEle.checked = true;
  }

  checkboxEle.addEventListener('change', function(event){       
    if(todoItem.completed === true){
      todoItem.completed = false;
      Todolist.controllers.dataModifier.patchTask(taskId, false);
    }
    else{
      todoItem.completed = true;
      Todolist.controllers.dataModifier.patchTask(taskId, true);
    }
  });

  //Create label element to store the task that the user inputted
  var taskEle = document.createElement("LABEL");
  var taskTextNode = document.createTextNode(taskName);
  taskEle.appendChild(taskTextNode);

  //Create span element for deletion
  var deleteEle = document.createElement("SPAN");
  deleteEle.setAttribute('class', 'obliterate');
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
    // checkCompleted: function(){return taskCompleted;},
    // toggleComplete: function(toggle){
    //   if(toggle === true){
    //     todoItem.completed = false;
    //     Todolist.controllers.dataModifier.patchTask(taskId, false);
    //   }
    //   else{
    //     todoItem.completed = true;
    //     Todolist.controllers.dataModifier.patchTask(taskId, true);
    //   }
    // }
    // toggleCompleted: function(){}
  };
});
// }());  //not self executing?