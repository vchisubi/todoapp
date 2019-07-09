// //Create a close button for each list
// var myNodeList = document.getElementsByTagName("LI");
// for(i = 0; i < myNodeList.length; i++){
// 	var span = document.createElement("SPAN");
// 	var txt = document.createTextNode("\u00D7");
// 	span.className = "close";
// 	span.appendChild(txt);
// 	myNodeList[i].appendChild(span);
// }

//When user inputs text into textbox, clicking enter will submit it
var inputByEnter = document.getElementById("textbox");

inputByEnter.addEventListener("keyup", function (event) {
  //13 signifies the Enter key
  if (event.keyCode === 13) {
    //This cancels the default action if necessary
    event.preventDefault();
    //Call the addItem() function below
    addItem();
  }
});


//Create a new item on the list
function addItem () {

  //Create new list element
  var li = document.createElement("li");

  //Set a 'contentEditable' attribute to keep track of whether checkbox is checked
  li.setAttribute('contentEditable', 'false');

  //Create a checkbox
  var checkbox = document.createElement("INPUT");
  checkbox.setAttribute("type", "checkbox");
  // checkbox.setAttribute("onclick", "toggleChecked();") //no longer needed
  checkbox.className += ' listcheckbox';
  li.appendChild(checkbox);

  //Fetch the user input data
  var inputItem = document.getElementById("textbox").value;

  //Create a text node with the input data
  // var newNode = document.createTextNode(inputItem);
  // li.appendChild(newNode);

  //Check if there is an input
  if (inputItem === '') {
    alert("Please enter a to-do task!");
  }

  else {
    document.getElementById("list").appendChild(li);
  }

  //TRY LABEL
  var span3 = document.createElement("LABEL");
  var txt3 = document.createTextNode(inputItem);
  span3.appendChild(txt3);
  span3.className = "listdata";
  li.appendChild(span3);
  //TRY LABEL

  //TRY THIS - Contain in SPAN
  // var span2 = document.createElement("SPAN");
  // var txt2 = document.createTextNode(inputItem);
  // span2.appendChild(txt2);
  // span2.className = "listdata";
  // li.appendChild(span2);
  //TRY THIS

  document.getElementById("textbox").value = "";

  var span = document.createElement("SPAN");

  var txt = document.createTextNode(" \u00D7");

  span.className = "close";

  span.appendChild(txt);

  li.appendChild(span);

  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}



//If the checkbox is checked, strike-through list item
// var list = document.querySelector('ul');
// list.addEventListener('click', function(ev){
// 	if(ev.target.name == 'LI'){
// 		ev.target.classList.toggle('checked');
// 	}
// }, false);


//Tried to actually delete whole tree, b/c it shows when toggling show all
// //Clicking on the close button hides the task
// var close = document.getElementsByClassName("close");
// for(i = 0; i < close.length; i++){
// 	close[i].onclick = function (){
// 		var div = this.parentElement;
// 		var child = div.firstElementChild;
// 		while(child){
// 			div.deleteChild(child)
// 			child = div.lastElementChild;
// 		}
// 		div.delete();
// 	}
// }

//Clicking on the close button hides the task
var close = document.getElementsByClassName("close");
for (i = 0; i < close.length; i++) {
  close[i].onclick = function () {
    var div = close[i].parentElement;
    console.log(div);
    div.remove();
  }
}

//Function for showing all the tasks via allButton
function showAll () {
  var x = document.getElementsByTagName("LI");

  for (i = 0; i < x.length; i++) {
    if (x[i].style.display === "none") {
      x[i].style.display = "block";
    }
    else {
      //This enables toggle functionality
      //x[i].style.display = "none";
    }
  }
}

//When user checks checkbox, toggles a 'contentEditable' attribute in the LI element, true or false
//This will be used to indicate whether the checkbox is checked for showing active and completed tasks
//NO LONGER NEEDED b/c of idea 2 for show active tasks button
// function toggleChecked(){
// 	var x = document.getElementsByClassName("listcheckbox")

// 	for(i = 0; i < x.length; i++){

// 		if(x[i].checked){
// 			var y = x[i].parentElement;
// 			y.setAttribute('contentEditable', 'true');
// 			// x.getAttribute('contentEditable') = 'true';
// 		}
// 		//
// 		else if(x[i].unchecked){
// 		 	var y = x[i].parentElement;
// 		 	y.setAttribute('contentEditable', 'false');
// 		}
// 	}
// }


// //Function for showing all the active tasks via activeButton
// function showActive(){
// 	var x = document.getElementsByTagName("LI");

// 	for(i = 0; i < x.length; i++){
// 		if(x[i].getAttribute('contentEditable') === 'true'){
// 			if(x[i].style.display === "none"){
// 				x[i].style.display = "block";
// 			}
// 			else{
// 				x[i].style.display = "none";					//Currently toggles because uncheck doesnt set contentEdited back to false
// 			}
// 		}
// 		else{

// 		}

// 	}
// }

//Second idea for showing all the active tasks via activeButton
function showActive () {

  var x = document.getElementsByClassName("listcheckbox")

  for (i = 0; i < x.length; i++) {

    if (x[i].checked) {
      var y = x[i].parentElement;
      y.style.display = "none";

    }

    else {
      var y = x[i].parentElement;
      y.style.display = "block";
    }
  }
}

//Function for showing all the completed tasks via activeButton
function showDone () {

  var x = document.getElementsByClassName("listcheckbox")

  for (i = 0; i < x.length; i++) {


    if (x[i].checked) {
      var y = x[i].parentElement;
      y.style.display = "block";
    }

    else {
      var y = x[i].parentElement;
      y.style.display = "none";

    }
  }
}




