//Kelvin's API link
const url = 'https://kelyvin-todo-api.herokuapp.com/';
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
//Clear button
var clearButton = document.getElementById("clearButton");

function postTodo(inputField){
  var data = {};
  data.title = inputField;
  data.order = 0;
  data.completed = false;
  var json = JSON.stringify(data);
  const xhr = new XMLHttpRequest();
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-type', 'application/json');  
  xhr.onload = () => {
    if(xhr.readyState === 4 && xhr.status === 200){
      let result = asyncGetAll().then((taskArray)=>{
        //console.log(taskArray);
        sortAndDisplayArray(taskArray);
      });
    }
    else{console.log('ERROR trying to add task');}
  };
  xhr.send(json);
}

//Removes a task from the array when its close button is clicked
function obliterateTask(id){
  let xhr = new XMLHttpRequest();
  xhr.open('DELETE', url + id, true);
  xhr.onload = () => {
    if(xhr.readyState === 4 && xhr.status === 200){
      let result = asyncGetAll().then((taskArray)=>{
        console.log('Deleted task ' + id + ':' + taskArray);
        sortAndDisplayArray(taskArray);
      });
    }
    else{console.log('ERROR during deletion of task');}
  };
  xhr.send(null);
}

//When the user checks the checkbox for a task, update the completed property of the task
function patchTask(id, toggle){
  var data = {};
  data.completed = toggle;
  var json = JSON.stringify(data);
  let xhr = new XMLHttpRequest();
  xhr.open('PATCH', url + id, true);
  xhr.setRequestHeader('Content-type', 'application/json');  
  xhr.onload = () => {
    if(xhr.readyState === 4 && xhr.status === 200){
        console.log('Patched task ' + id + ':' + xhr.responseText);
    }
    else{console.log('ERROR during updating of task');}
  };
  xhr.send(json);  
}

function rerender(inputArray){
  //Clear the current UL (gets rid of all current LI's)
  todoContainer.innerHTML = '';
  //Create a UL parent to append to
  var listWrapperUL = document.createElement('UL');

  inputArray.forEach(function (todoItem, index){
    var taskName = todoItem.title;
    //Create LI element
    var listEle = createLI();
    //Set an identifier the list
    listEle.setAttribute("list-id", todoItem.id);
    //Create checkbox element
    var checkboxEle = createCheckbox();
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
        patchTask(currId, false);
      }
      //Otherwise, change it to checked
      else{
        todoItem.completed = true;
        patchTask(currId, true);
      }
      //console.log(todoTasks);
    });
    //Create span element for task
    var taskEle = createTask(taskName);
    //Create delete button element
    var deleteEle = createDelete();
    //Sets it so that when the close button is clicked, triggers delete task method
    deleteEle.addEventListener('click', function(event){
      obliterateTask(todoItem.id);
    });
    listEle.appendChild(checkboxEle);
    listEle.appendChild(taskEle);
    listEle.appendChild(deleteEle);
    listWrapperUL.appendChild(listEle);
  })
  todoContainer.appendChild(listWrapperUL);
}

async function asyncGetAll(){
  let result = await getAllTodos();
  let resultParsed = JSON.parse(result);
  return resultParsed;
}

function getAllTodos(){
  return new Promise(function (resolve, reject){
    let xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = function(){
      if(this.status >= 200 && this.status < 300){
        resolve(xhr.response);
      }
      else{
        reject({
          status: this.status,
          statusText: xhr.statusText
        });
      }
    };
    xhr.onerror = function(){
      reject({
        status: this.status,
        statusText: xhr.statusText
      });
    };
    xhr.send();
  });
}

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
      // addTask(inputItem);
      postTodo(inputItem);
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
    postTodo(inputItem);
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

//Clear all tasks from the todo list when the clearButtpn is clicked
clearButton.addEventListener("click", function(event){
  const xhr = new XMLHttpRequest();
  xhr.open('DELETE', url);
  xhr.send(null);
  todoContainer.innerHTML = '';
});

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
  let result = asyncGetAll().then((taskArray)=>{
    sortAndDisplayArray(taskArray);
  });
}

//Retrieve the active tasks from todoTasks and store it in a separate array, then display
function showActive(){
  let activeArray = [];
  let result = asyncGetAll().then((taskArray)=>{
    taskArray.forEach(function (todoItem){
      //If the task is checked, add to activeTasks array
      if(todoItem.completed === false){
        activeArray.push(todoItem);
      }
    });
    rerender(activeArray);
  });
}

//Retrieve the completed tasks from todoTasks and store it in a separate array, then display
function showDone(){
  let doneArray = [];
  let result = asyncGetAll().then((taskArray)=>{
    taskArray.forEach(function (todoItem){
      //If the task is checked, add to activeTasks array
      if(todoItem.completed === true){
        doneArray.push(todoItem);
      }
    });
    rerender(doneArray);
  });
}

//Sort the array of tasks by id then display them
function sortAndDisplayArray(){
  let sortedArray = [];
  let result = asyncGetAll().then((taskArray)=>{
    let sortedArray = taskArray.sort(function(a,b){
      console.log(a.id - b.id);
      return a.id - b.id;
    });
    sortedArray = taskArray;
    rerender(sortedArray);
  });
}
