  var loginApp = angular.module('loginApp', ['ui.bootstrap']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
		if(input!=undefined)
        {return input.slice(start);}
    }
});
  loginApp.controller('loginController', function($scope, $http,$window) {   
	document.addEventListener("deviceready",onDeviceReady,false);
		function onDeviceReady(){
						
		}
	

	$scope.errormsg = false;
	$scope.submitForm = function() {
		$http({
			method  : 'POST',
			url     : 'http://103.252.7.5:8852/api/user/auth',
			data    : $scope.user,
			headers : {'Content-Type': 'application/json'} 
		}).success(function(data) {
			if (!data.success) {
				$scope.errormMessage = data.message;
				$scope.errormsg = true;
			} 
			else 
			{
				$window.localStorage["username"] = JSON.stringify(data.data.fullname);
				$window.localStorage["userid"] = JSON.stringify(data.data.id);
				$window.localStorage["userlevel"] = JSON.stringify(data.data.userlevel);
				$window.localStorage["companyid"] = JSON.stringify(data.data.companyid);
				$window.localStorage["companyname"] = JSON.stringify(data.data.companyname);
				
				$scope.username = $window.localStorage["username"];
				$scope.username=$scope.username.replace(/\"/g,""); 
				$scope.companyname = $window.localStorage["companyname"];
				$scope.companyname=$scope.companyname.replace(/\"/g,""); 
				$scope.userid = $window.localStorage["userid"];
				$scope.companyid = $window.localStorage["companyid"];
				$scope.userlevel = $window.localStorage["userlevel"];
				$scope.userlevel = $scope.userlevel.replace(/\"/g,""); 
				if($scope.userlevel === 'Superadmin')
				{
					$window.location.href='./DashboardSa.html';
				}
				else
				{
					$window.location.href='./Dashboard.html';
				}
			}
		});
	};
	
	
	$scope.CheckAlreadylogin = function()
	{
		if($window.localStorage["username"] != undefined && $window.localStorage["userid"] != undefined && $window.localStorage["Userlevel"] != undefined)
		{
			$scope.username = $window.localStorage["username"];
			$scope.username=$scope.username.replace(/\"/g,""); 
			$scope.userid = $window.localStorage["userid"];
			$scope.userlevel = $window.localStorage["Userlevel"];
			$scope.userlevel = $scope.userlevel.replace(/\"/g,""); 
			$scope.supervisor = $window.localStorage["supervisor"];
			$scope.entityid = $window.localStorage["entityid"];
				
			$window.sessionStorage["token"] = $window.localStorage["token"];
			$window.sessionStorage["username"] = JSON.stringify($scope.username);
			$window.sessionStorage["userid"] = JSON.stringify($scope.userid);
			$window.sessionStorage["Userlevel"] = JSON.stringify($scope.userlevel);
			$window.sessionStorage["supervisor"] = JSON.stringify($scope.supervisor);
			$window.sessionStorage["entityid"] = JSON.stringify($scope.entityid);
				
			$window.location.href='./Dashboard.html';
		}
	};
});