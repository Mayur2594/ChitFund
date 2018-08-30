  var ChitfundApp = angular.module('ChitfundApp', ['ui.bootstrap']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
       if(input!=undefined)
        {return input.slice(start);}
    }
}); 
  ChitfundApp.controller('chitFundController', function($scope,$http,$window,$rootScope) {
	  
					var url = window.location.href;
					var qparts = url.split("?");
					$scope.valuepassed = qparts[1];
					
					
					$scope.companyname = $window.localStorage["companyname"];
					$scope.companyname=$scope.companyname.replace(/\"/g,"");
					$scope.username = $window.sessionStorage["username"];
					$scope.username=$scope.username.replace(/\"/g,""); 
					$scope.userid = $window.sessionStorage["userid"].replace(/\"/g,"");
					$scope.userlevel = $window.sessionStorage["Userlevel"];
					$scope.userlevel = $scope.userlevel.replace(/\"/g,""); 
			
			
				

			
			
});