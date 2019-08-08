// //Updates the global arrays
// export function updateAndSort(){

//   allTasks = handleRequest('GETALL', urlGlobal);

//   let sortedArray = allTasks.sort(function(a,b){
//     //console.log(a.id - b.id);
//     return a.id - b.id;
//   });

//   allTasks = sortedArray;
// }

// export function updateActiveAndDone(){
//   taskArray.forEach(function (todoItem){
//     //If the task is checked, add to activeTasks array
//     if(todoItem.completed === false){
//       activeTasks.push(todoItem);
//     }
//     else{
//       doneTasks.push(todoItem);
//     }
//   });
// }