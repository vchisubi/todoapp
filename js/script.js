//Array that stores the todo tasks
var todoTasks = [];
//Array that stores all the active tasks
var activeTasks = [];
//Array that stores all the completed tasks
var completedTasks = [];
//Stores the div element that houses the UL and its LI elements
var todoContainer = document.getElementById("divContainer");
//Stores the textbox object
var inputByEnter = document.getElementById("todoInput");
//Store the submit button object
var inputBySubmit = document.getElementById("submitButton");
//Store the button that shows all tasks
var allButton = document.getElementById("allButton");
//Store the button that shows all active tasks
var activeButton = document.getElementById("activeButton");
//Store the button that shows all completed tasks
var doneButton = document.getElementById("doneButton");
//Store the current view of the webpage (All/Active/Completed)
var currView = 'ALL';

//When user inputs text into textbox, clicking enter will submit it
inputByEnter.addEventListener("keyup", function(event){
  //Get the text that the user inputted
  var inputItem = inputByEnter.value;

  //13 signifies the Enter key
  if(event.keyCode === 13){	
    //This cancels the default action if necessary
    event.preventDefault();
        //Check if there is an input
    if(inputItem === ''){
      alert("Please enter a to-do task!");
    }

    else{
      addTask(inputItem);
      inputByEnter.value = "";
    }
  }
});

//When user inputs text into textbox, clicking the submit button will submit it
inputBySubmit.addEventListener("click", function(event){
  //Get the text that the user inputted
  var inputItem = inputByEnter.value;

  if(inputItem === ''){
    alert("Please enter a to-do task!");
  }

  else{
    addTask(inputItem);
    inputByEnter.value = "";
  }
});

//call the showAll method when the showAll button is clicked
allButton.addEventListener("click", function(event){
  showAll();
});

//call the showActive method when the showActive button is clicked
activeButton.addEventListener("click", function(event){
  showActive();
});

//call the showDone method when the showDone button is clicked
doneButton.addEventListener("click", function(event){
  showDone();
});

//Add a an input task
function addTask(inputTask){
  const todo = {
    inputTask,
    checked: false,
    id: Date.now()
  };

  todoTasks.push(todo);
  console.log(todoTasks);

  rerender(todoTasks);
}

// //Removes a task from the array when its close button is clicked
function obliterateTask(index, id){
  if(currView === 'ACTIVE'){
    const currId = id;
    activeTasks.splice(index, 1);
    rerender(activeTasks);

    //Look for the task to delete in todoTasks via id
    for(i = 0; i , todoTasks.length; i++){
      console.log(currId);
      console.log(todoTasks[i].id);
      if(todoTasks[i].id == currId){
        todoTasks.splice(i, 1);
      }
    }
  }
  else if(currView === 'COMPLETED'){
    const currId = id;
    completedTasks.splice(index, 1);
    rerender(completedTasks);

    //Look for the task to delete in todoTasks via id
    for(i = 0; i , todoTasks.length; i++){
      console.log(currId);
      console.log(todoTasks[i].id);
      if(todoTasks[i].id == currId){
        todoTasks.splice(i, 1);
      }
    }
  }
  else if(currView === 'ALL'){
    todoTasks.splice(index, 1);
    rerender(todoTasks);
  }
}

//Rerender the todo list
function rerender(inputArray){
  //Clear the current UL (gets rid of all current LI's)
  todoContainer.innerHTML = '';

  //Create a UL parent to append to
  var listWrapperUL = document.createElement('UL');

  //Construct new todos for the list
  inputArray.forEach(function (todoItem, index){

    var taskName = todoItem.inputTask;

    //Create LI element
    var listEle = createLI();

    //Create checkbox element
    var checkboxEle = createCheckbox();

    //If the checkbox was checked before a rerender, display it as checked
    if(todoItem.checked){
      checkboxEle.checked = true;
    }
    
    //Sets it so that when the checkbox is checked or unchecked, changes the checked property accordingly
    checkboxEle.addEventListener('change', function(event){
      //If it was checked before, change it to unchecked
      if(todoItem.checked){
        console.log(todoItem.checked)
        todoItem.checked = false;
      }
      //Otherwise, change it to checked
      else{
        todoItem.checked = true;
      }
      console.log(todoTasks);

    });

    //Create span element for task
    var taskEle = createTask(taskName);
    //Create delete button element
    var deleteEle = createDelete();

    //Sets it so that when the close button is clicked, triggers delete task method
    deleteEle.addEventListener('click', function(event){
      obliterateTask(index, todoItem.id);
    });

    listEle.appendChild(checkboxEle);
    listEle.appendChild(taskEle);
    listEle.appendChild(deleteEle);

    //Append each list child to the UL parent
    listWrapperUL.appendChild(listEle);

  })
  //Append the UL parent to the div container in the index.html
  todoContainer.appendChild(listWrapperUL);
}

//Create an LI element
function createLI(){
  var listEle = document.createElement("LI", {class:'todo-item'});
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
  var taskText1 = taskItem;
  var taskEle = document.createElement("LABEL");
  var taskText = document.createTextNode(taskItem);
  taskEle.appendChild(taskText);
  return taskEle;
}

//Create a delete button element
function createDelete(){
  var deleteEle = document.createElement("SPAN");
  deleteEle.setAttribute('class', 'obliterate')
  // deleteEle.setAttribute('onclick', 'removeTask()');
  var closeChar = document.createTextNode('\u00D7');
  deleteEle.appendChild(closeChar);
  return deleteEle;
}

//Function for showing all the tasks via allButton
function showAll(){

  currView = 'ALL';

  rerender(todoTasks);
}

//Retrieve the active tasks from todoTasks and store it in a separate array, then display
function showActive(){

  currView = 'ACTIVE';

  activeTasks = [];

  todoTasks.forEach(function (todoItem, index){
    //If the task is checked, add to activeTasks array
    if(todoItem.checked === false){
      activeTasks.push(todoItem);
    }
  });

  rerender(activeTasks);
}

//Retrieve the completed tasks from todoTasks and store it in a separate array, then display
function showDone(){

  currView = 'COMPLETED';

  completedTasks = [];

  todoTasks.forEach(function (todoItem, index){
    //If the task is checked, add to activeTasks array
    if(todoItem.checked){
      completedTasks.push(todoItem);
    }
  });

  rerender(completedTasks);
}
