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

Todolist.views.inputs.inputByEnter = (function() {
  'use strict';

  var inputField = document.getElementById("todoInput");

  inputField.addEventListener("keyup", function(event){

    var inputItem = inputField.value;

    if(event.keyCode === Todolist.enums.keyCodes.enter){	

      event.preventDefault();

      if(inputItem === ''){
        alert("Please enter a to-do task!");
      }

      else{
        Todolist.controllers.dataModifier.postTodo(inputItem);
        inputField.value = "";
      }
    }
  });

  return{
    getInputField: function(){return inputField;}
  };
}());