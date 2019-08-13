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
Todolist.controllers.dataModifier = (function() {
  'use strict';

  async function updateAndSort(){
    Todolist.models.state.allTasks = [];

    let resultArray = await Todolist.utils.apiHelper.handleRequest('GET', Todolist.configs.api.url);

    let sortedArray = resultArray.sort(function(a,b){
      return a.id - b.id;
    });

    Todolist.models.state.allTasks = sortedArray;

    console.log(Todolist.models.state.allTasks);
    return Todolist.models.state.allTasks;
  }

  function updateActiveTasks(){
    Todolist.models.state.activeTasks = [];

    Todolist.models.state.allTasks.forEach(function (todoItem){
      if(todoItem.completed === false){
        Todolist.models.state.activeTasks.push(todoItem);
      }
    });
  }

  function updateCompletedTasks(){
    Todolist.models.state.doneTasks = [];

    Todolist.models.state.allTasks.forEach(function (todoItem){
      if(todoItem.completed === true){
        Todolist.models.state.doneTasks.push(todoItem);
      }
    });
  }

  function postTodo(inputField){
    var data = {};
    data.title = inputField;
    data.completed = false;
    Todolist.utils.apiHelper.handleRequest('POST', Todolist.configs.api.url, data).then(() => {
      Todolist.controllers.dataModifier.updateAndSort().then((taskArray)=>{
        Todolist.views.updateList.rerender(taskArray);
      });
    });
  }
  
  function obliterateTask(id){
    Todolist.utils.apiHelper.handleRequest('DELETE', Todolist.configs.api.url + id).then(() => {
      Todolist.controllers.dataModifier.updateAndSort().then((taskArray)=>{
        Todolist.views.updateList.rerender(taskArray);}
        );
    });
  }
  
  function patchTask(id, toggle){
    var data = {};
    data.completed = toggle;
    Todolist.utils.apiHelper.handleRequest('PATCH', Todolist.configs.api.url + id, data).then(() => {
      Todolist.controllers.dataModifier.updateAndSort();
    });
  }

  function getAllTodos(){
    Todolist.utils.apiHelper.handleRequest('GET', Todolist.configs.api.url);
    //This returns an array
    //let taskArray = Todolist.utils.apiHelper.handleRequest('GETALL', Todolist.configs.api.url).then((taskArray)=>{console.log(taskArray);});
  }

  return {
    updateAndSort: updateAndSort,
    updateActiveTasks: updateActiveTasks,
    updateCompletedTasks: updateCompletedTasks,
    postTodo: postTodo,
    obliterateTask: obliterateTask,
    patchTask: patchTask,
    getAllTodos: getAllTodos
  };
}());