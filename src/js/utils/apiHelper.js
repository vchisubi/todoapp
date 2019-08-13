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

Todolist.utils.apiHelper = (function() {
  'use strict';

  function handleRequest(requestType, url, param = {}){  
    var request = requestType;
    var currUrl = url;
    var jsonData = JSON.stringify(param);
  
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
          if(request === 'GET'){
            resolve(JSON.parse(xhr.response));
          }
          else{
            resolve();
          }
        }
        else{
          reject(Error('An error occurred during an API request: ' + xhr.statusText));
        }
      }
      xhr.onerror = () => {
        reject(Error('An error occurred during an API request: ' + xhr.statusText));
      }
    });
  }

  return{
    handleRequest: handleRequest
  }
}());

