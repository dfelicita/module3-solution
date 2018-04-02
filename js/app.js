(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuCategoriesService', MenuCategoriesService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


NarrowItDownController.$inject = ['MenuCategoriesService'];
function NarrowItDownController(MenuCategoriesService) {
  var obj = this;
  var found = [];

  var promise = MenuCategoriesService.getMenuCategories();

  promise.then(function (response) {
    obj.categories = response.data;
    obj.categories.forEach(function(res){
      var aux = obj.getMenuItems(res.shortName);
      console.log('res',res,'aux',aux);
      found.concat(aux);
    });
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

  obj.getMenuItems = function (shortName) {
    var promise = MenuCategoriesService.getMenuForCategory(shortName);

    promise.then(function (response) {
      return response;
    })
    .catch(function (error) {
      console.log(error);
    })
  };

}


MenuCategoriesService.$inject = ['$http', 'ApiBasePath'];
function MenuCategoriesService($http, ApiBasePath) {
  var service = this;

  service.getMenuCategories = function () {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/categories.json")
    });

    return response;
  };


  service.getMenuForCategory = function (shortName) {
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json"),
      params: {
        category: shortName
      }
    });

    return response;
  };

}

})();
