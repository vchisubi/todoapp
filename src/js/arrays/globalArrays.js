var Todolist = Todolist || {
  enums: {},
  arrays: {},
  elements: {},
  configs: {},
  utils: {},
  views: {},
};

Todolist.arrays.globalArrays = (function(){
  'use strict';

  return{
    allTasks: [],
    activeTasks: [],
    doneTasks: []
  };
}());