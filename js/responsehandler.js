// window.handleRequest = function(requestType, url, toggle = false, task = 'placeholder'){
  
//     var request = requestType;
//     var currUrl = url;          //If id is needed (get, delete, or patch), pass it in as URL+ID
//     var trueOrFalse = toggle;
//     var todo = task;
  
//     if(request === 'GETALL'){
//       request = 'GET';
//     }
  
//     else if(request === 'DELETEALL'){
//       request = 'DELETE';
//     }
  
//     if(request === 'POST' || request === 'PATCH'){
//       var data = {};
//         if(request === 'POST'){
//           data.title = todo;
//           data.completed = false;
//         }
//         else{
//           data.completed = trueOrFalse;
//         }
//         var jsonData = JSON.stringify(data);
//     }
//     return new Promise(function (resolve, reject){
//       let xhr = new XMLHttpRequest();
//       xhr.open(request, currUrl, true);
//       xhr.setRequestHeader('Content-type', 'application/json'); 
//       if(request === 'GET' || request === 'DELETE'){
//         xhr.send();
//       }
//       else{
//         xhr.send(jsonData);
//       }
//       xhr.onload = () => {
//         if(xhr.readyState == 4 && xhr.status === 200){
//           if(requestType === 'DELETEALL'){
//             todoContainer.innerHTML = '';
//             allTasks = [];
//             activeTasks = [];
//             doneTasks = [];
//             resolve();
//           }
//           else if(request === 'POST' || request === 'DELETE' || request === 'PATCH'){
//             //Get the updated todo list
//             //allTasks = handleRequest('GET', urlGlobal);
//             if(request === 'POST' || request === 'DELETE'){
//               //Sort and display the todo list
//               resolve(updateAndSort().then((taskArray)=>{rerender(taskArray);}));
//             }
//             else if(request === 'PATCH'){
//               resolve(updateAndSort());     //Write another method for this???
//             }
//           }
//           else if(request === 'GET'){
//             //console.log(JSON.parse(xhr.response));
//             resolve(JSON.parse(xhr.response));
//           }
//         }
//         else{
//           reject(console.error("Error occurred"));
//         }
//       }
//       xhr.onerror = () => {
//         reject(console.error("Error occurred")); 
//       }
//     });
//   }