var Todolist = Todolist || {
  enums: {},
  models: {},
  controllers: {},
  elements: {},
  configs: {},
  utils: {},
  views: {
    components: {},
    inputs: {},
    pages: {
      main: {}
    },
  }
};

Todolist.views.inputs.inputBySubmit = (function() {
  'use strict';

  var submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", function(event){

    var inputItem = Todolist.views.inputs.inputByEnter.getInputField().value;

    if(inputItem === ''){
      alert("Please enter a to-do task!");
    }

    else{
      Todolist.controllers.dataModifier.postTodo(inputItem);
      Todolist.views.inputs.inputByEnter.getInputField().value = "";
    }
  });

  return{
    getSubmitButton: function(){return submitButton;}
  };
}());