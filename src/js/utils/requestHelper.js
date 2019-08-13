var Todolist = Todolist || {
  enums: {},
  arrays: {},
  elements: {},
  configs: {},
  utils: {},
  views: {},
};

Todolist.utils.requestHelper = (function() {
  'use strict';

  function postTodo(inputField){
    var data = {};
    data.title = inputField;
    data.completed = false;
    Todolist.utils.apiHelper.handleRequest('POST', Todolist.configs.api.url, data).then(() => {
      Todolist.utils.arrayHelper.updateAndSort().then((taskArray)=>{
        Todolist.utils.arrayHelper.rerender(taskArray);
      });
    });
  }
  
  function obliterateTask(id){
    Todolist.utils.apiHelper.handleRequest('DELETE', Todolist.configs.api.url + id).then(() => {
      Todolist.utils.arrayHelper.updateAndSort().then((taskArray)=>{
        Todolist.utils.arrayHelper.rerender(taskArray);}
        );
    });
  }
  
  function patchTask(id, toggle){
    var data = {};
    data.completed = toggle;
    Todolist.utils.apiHelper.handleRequest('PATCH', Todolist.configs.api.url + id, data).then(() => {
      Todolist.utils.arrayHelper.updateAndSort();
    });
  }

  function getAllTodos(){
    Todolist.utils.apiHelper.handleRequest('GET', Todolist.configs.api.url);
    //This returns an array
    //let taskArray = Todolist.utils.apiHelper.handleRequest('GETALL', Todolist.configs.api.url).then((taskArray)=>{console.log(taskArray);});
  }
  
  return{
    postTodo: postTodo,
    obliterateTask: obliterateTask,
    patchTask: patchTask,
    getAllTodos: getAllTodos
  }
}());