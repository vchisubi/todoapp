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
Todolist.models.state = (function(){
  'use strict';

  return{
    allTasks: [],
    activeTasks: [],
    doneTasks: []
  };
}());