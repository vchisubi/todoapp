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

Todolist.configs.api = (function() {
  'use strict';

  return {
    url: 'https://kelyvin-todo-api.herokuapp.com/'
  }
}());