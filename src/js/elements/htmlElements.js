var Todolist = Todolist || {
  enums: {},
  arrays: {},
  elements: {},
  configs: {},
  utils: {},
  views: {},
};

Todolist.elements.htmlElements = (function(){
  'use strict';

  return {
    //Stores the div element that houses the UL and its LI elements
    todoContainer: document.getElementById("divContainer"),

    //Stores the textbox object
    inputByEnter: document.getElementById("todoInput"),

    //Store the submit button object
    inputBySubmit: document.getElementById("submitButton"),

    //Store the button that shows all tasks
    allButton: document.getElementById("allButton"),

    //Store the button that shows all active tasks
    activeButton: document.getElementById("activeButton"),

    //Store the button that shows all completed tasks
    doneButton: document.getElementById("doneButton"),

    //Clear button that removes all tasks
    clearButton: document.getElementById("clearButton"),
  };
}());