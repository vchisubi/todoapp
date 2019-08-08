var Todolist = Todolist || {
  enums: {},
  arrays: {},
  elements: {},
  configs: {},
  utils: {},
  views: {},
};

Todolist.elements.elementCreator = (function() {
  'use strict';

  //Create an LI element
  function createLI(){
    var listEle = document.createElement("LI");
    listEle.setAttribute('class', 'list-checkbox');
    return listEle;
  }

  //Create a checkbox element
  function createCheckbox(){
    var checkboxEle = document.createElement("INPUT");
    checkboxEle.setAttribute('type', 'checkbox');
    checkboxEle.setAttribute('class', 'list-checkbox');
    return checkboxEle;
  }

  //Create a label element for the task
  function createTask(taskItem){
    var taskEle = document.createElement("LABEL");
    var taskText = document.createTextNode(taskItem);
    taskEle.appendChild(taskText);
    return taskEle;
  }

  //Create a delete button element
  function createDelete(){
    var deleteEle = document.createElement("SPAN");
    deleteEle.setAttribute('class', 'obliterate');
    var closeChar = document.createTextNode('\u00D7');
    deleteEle.appendChild(closeChar);
    return deleteEle;
  }

  return{
    createLI: createLI,
    createCheckbox: createCheckbox,
    createTask: createTask,
    createDelete: createDelete
  }
}());