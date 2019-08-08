//Kelvin's API link
const urlGlobal = 'https://kelyvin-todo-api.herokuapp.com/';
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

//Global todo list variable
var allTasks = [];
var activeTasks = [];
var doneTasks = [];

function loadPage(){
  updateAndSort().then((taskArray)=>{
    //console.log(taskArray);
    rerender(taskArray);
  });
}

function handleRequest(requestType, url, toggle = false, task = 'placeholder'){
  
  var request = requestType;
  var currUrl = url;          //If id is needed (get, delete, or patch), pass it in as URL+ID
  var trueOrFalse = toggle;
  var todo = task;

  if(request === 'GETALL'){
    request = 'GET';
  }

  else if(request === 'DELETEALL'){
    request = 'DELETE';
  }

  if(request === 'POST' || request === 'PATCH'){
    var data = {};
      if(request === 'POST'){
        data.title = todo;
        data.completed = false;
      }
      else{
        data.completed = trueOrFalse;
      }
      var jsonData = JSON.stringify(data);
  }
  return new Promise(function (resolve, reject){
    let xhr = new XMLHttpRequest();
    xhr.open(request, currUrl, true);
    xhr.setRequestHeader('Content-type', 'application/json'); 
    if(request === 'GET' || request === 'DELETE'){
      xhr.send();
    }
    else{
      xhr.send(jsonData);
    }
    xhr.onload = () => {
      if(xhr.readyState == 4 && xhr.status === 200){
        if(requestType === 'DELETEALL'){
          todoContainer.innerHTML = '';
          allTasks = [];
          activeTasks = [];
          doneTasks = [];
          resolve();
        }
        else if(request === 'POST' || request === 'DELETE' || request === 'PATCH'){
          //Get the updated todo list
          //allTasks = handleRequest('GET', urlGlobal);
          if(request === 'POST' || request === 'DELETE'){
            //Sort and display the todo list
            resolve(updateAndSort().then((taskArray)=>{rerender(taskArray);}));
          }
          else if(request === 'PATCH'){
            resolve(updateAndSort());     //Write another method for this???
          }
        }
        else if(request === 'GET'){
          //console.log(JSON.parse(xhr.response));
          resolve(JSON.parse(xhr.response));
        }
      }
      else{
        reject(console.error("Error occurred"));
      }
    }
    xhr.onerror = () => {
      reject(console.error("Error occurred")); 
    }
  });
}

//Updates the global arrays
async function updateAndSort(){

  allTasks = [];
  activeTasks = [];
  doneTasks = [];

  let resultArray = await handleRequest('GETALL', urlGlobal);

  let sortedArray = resultArray.sort(function(a,b){
    //console.log(a.id - b.id);
    return a.id - b.id;
  });

  allTasks = sortedArray;

  allTasks.forEach(function (todoItem){
    //If the task is checked, add to activeTasks array
    if(todoItem.completed === false){
      activeTasks.push(todoItem);
    }
    else{
      doneTasks.push(todoItem);
    }
  });
  return allTasks;
}

function postTodo(inputField){
  handleRequest('POST', urlGlobal, undefined, inputField);
}

function obliterateTask(id){
  handleRequest('DELETE', urlGlobal + id);
}

function patchTask(id, toggle){
  handleRequest('PATCH', urlGlobal + id, toggle); 
}

function rerender(inputArray){
  //Clear the current UL (gets rid of all current LI's)
  todoContainer.innerHTML = '';
  //Create a UL parent to append to
  var listWrapperUL = document.createElement('UL');
  //Go thru each task in the array and display them
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

function getAllTodos(){
  handleRequest('GETALL', urlGlobal);
  //This returns an array
  let taskArray = handleRequest('GETALL', urlGlobal).then((taskArray)=>{console.log(taskArray);});
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
  displayView(allTasks);
});

//call the showActive method when the showActive button is clicked
activeButton.addEventListener("click", function(event){
  displayView(activeTasks);
});

//call the showDone method when the showDone button is clicked
doneButton.addEventListener("click", function(event){
  displayView(doneTasks);
});

clearButton.addEventListener("click", function(event){
  handleRequest('DELETEALL', urlGlobal);
});

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
  var taskText1 = taskItem;
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

//Displays the desired view of the todo list via button click
function displayView(viewArray){
  rerender(viewArray);
}
