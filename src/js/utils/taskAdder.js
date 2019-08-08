var Todolist = Todolist || {
  enums: {},
  arrays: {},
  elements: {},
  configs: {},
  utils: {},
  views: {},
};

Todolist.utils.taskAdder = (function() {
  'use strict';

  //When user inputs text into textbox, clicking enter will submit it
  var addByEnter = Todolist.elements.htmlElements.inputByEnter.addEventListener("keyup", function(event){
    //Get the text that the user inputted
    var inputItem = Todolist.elements.htmlElements.inputByEnter.value;

    //13 signifies the Enter key
    if(event.keyCode === Todolist.enums.keyCodes.enter){	
      //This cancels the default action if necessary
      event.preventDefault();
          //Check if there is an input
      if(inputItem === ''){
        alert("Please enter a to-do task!");
      }

      else{
        Todolist.utils.requestHelper.postTodo(inputItem);
        Todolist.elements.htmlElements.inputByEnter.value = "";
      }
    }
  });

  //When user inputs text into textbox, clicking the submit button will submit it
  var addBySubmit = Todolist.elements.htmlElements.inputBySubmit.addEventListener("click", function(event){
    //Get the text that the user inputted
    var inputItem = Todolist.elements.htmlElements.inputByEnter.value;

    if(inputItem === ''){
      alert("Please enter a to-do task!");
    }

    else{
      Todolist.utils.requestHelper.postTodo(inputItem);
      Todolist.elements.htmlElements.inputByEnter.value = "";
    }
  });
}());