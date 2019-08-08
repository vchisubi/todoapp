var Todolist = Todolist || {
  enums: {},
  arrays: {},
  elements: {},
  configs: {},
  utils: {},
  views: {},
};

Todolist.configs.api = (function() {
  'use strict';

  return {
    url: 'https://kelyvin-todo-api.herokuapp.com/'
  }
}());