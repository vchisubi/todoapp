var Todolist = Todolist || {
  enums: {},
  arrays: {},
  elements: {},
  configs: {},
  utils: {},
  views: {},
};

Todolist.utils.arrayHelper = (function() {
  'use strict';

  async function updateAndSort(){
    Todolist.arrays.globalArrays.allTasks = [];

    let resultArray = await Todolist.utils.apiHelper.handleRequest('GET', Todolist.configs.api.url);

    let sortedArray = resultArray.sort(function(a,b){
      return a.id - b.id;
    });

    Todolist.arrays.globalArrays.allTasks = sortedArray;

    return Todolist.arrays.globalArrays.allTasks;
  }

  function updateActiveTasks(){
    Todolist.arrays.globalArrays.activeTasks = [];

    Todolist.arrays.globalArrays.allTasks.forEach(function (todoItem){
      if(todoItem.completed === false){
        Todolist.arrays.globalArrays.activeTasks.push(todoItem);
      }
    });
  }

  function updateCompletedTasks(){
    Todolist.arrays.globalArrays.doneTasks = [];

    Todolist.arrays.globalArrays.allTasks.forEach(function (todoItem){
      if(todoItem.completed === true){
        Todolist.arrays.globalArrays.doneTasks.push(todoItem);
      }
    });
  }

  function rerender(inputArray){
    //Clear the current UL (gets rid of all current LI's)
    Todolist.elements.htmlElements.todoContainer.innerHTML = '';
    //Create a UL parent to append to
    var listWrapperUL = document.createElement('UL');
    //Go thru each task in the array and display them
    inputArray.forEach(function (todoItem, index){
      var taskName = todoItem.title;
      //Create LI element
      var listEle = Todolist.elements.elementCreator.createLI();
      //Set an identifier the list
      listEle.setAttribute("list-id", todoItem.id);
      //Create checkbox element
      var checkboxEle = Todolist.elements.elementCreator.createCheckbox();
      //If the checkbox was checked before a rerender, display it as checked
      if(todoItem.completed){
        checkboxEle.checked = true;
      }
      //Sets it so that when the checkbox is checked or unchecked, changes the checked property accordingly
      checkboxEle.addEventListener('change', function(event){
        //If it was checked before, change it to unchecked
        let listEle = this.parentElement;
        let currId = listEle.getAttribute('list-id');
        if(todoItem.completed){
          todoItem.completed = false;
          //Call the patch method to update by id
          Todolist.utils.requestHelper.patchTask(currId, false);
        }
        //Otherwise, change it to checked
        else{
          todoItem.completed = true;
          Todolist.utils.requestHelper.patchTask(currId, true);
        }
      });
      //Create span element for task
      var taskEle = Todolist.elements.elementCreator.createTask(taskName);
      //Create delete button element
      var deleteEle = Todolist.elements.elementCreator.createDelete();
      //Sets it so that when the close button is clicked, triggers delete task method
      deleteEle.addEventListener('click', function(event){
        Todolist.utils.requestHelper.obliterateTask(todoItem.id);
      });
      listEle.appendChild(checkboxEle);
      listEle.appendChild(taskEle);
      listEle.appendChild(deleteEle);
      listWrapperUL.appendChild(listEle);
    })
    Todolist.elements.htmlElements.todoContainer.appendChild(listWrapperUL);
  }

  return {
    updateAndSort: updateAndSort,
    updateActiveTasks: updateActiveTasks,
    updateCompletedTasks: updateCompletedTasks,
    rerender: rerender
  };
}());