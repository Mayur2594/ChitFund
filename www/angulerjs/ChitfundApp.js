  var ChitfundApp = angular.module('ChitfundApp', ['ui.bootstrap','ngTouch']).filter('startFrom', function () {
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
					$scope.username = $window.localStorage["username"];
					$scope.username=$scope.username.replace(/\"/g,""); 
					$scope.companyid = $window.localStorage["companyid"].replace(/\"/g,"");
					$scope.userid = $window.localStorage["userid"].replace(/\"/g,"");
					$scope.userlevel = $window.localStorage["userlevel"];
					$scope.userlevel = $scope.userlevel.replace(/\"/g,""); 
					
				
				
				/* GLOBAL CODE FOR SWIPE ACTION FOR DELET ENTRY*/
				
					$scope.ToggleDeleteAction = function(fullrecord,index)
					{
						fullrecord.map(function(record,id){
							record.deletetoggle = false;
							if(id == index)
								fullrecord[index].deletetoggle = true;
						});
					}
					$scope.Toggleactions = function(resultedData)
					{
						$scope.ResultedRecords = resultedData;
						angular.element(document).on('click', function () {
							$scope.ResultedRecords.map(function(value){
										value.deletetoggle = false;
							})
							$scope.$apply();
						});
					}
				
				/* ------------------------------------------- */
				
				/* DASBOARD---------------------------------------- */
						$scope.Curentdate = new Date();
			
				$scope.getDashboardCount = function(interval,valuepassed)
			{
				if(interval =='month')
				{
					var mm = valuepassed.getMonth() +1;
						if(mm < 10)
							mm = '0'+mm;
						var yy = valuepassed.getFullYear();
						var passinterval = yy+'-'+mm;
				}
				if(interval =='day')
				{
					var dd = valuepassed.getDate()
					if(dd < 10)
					{dd = '0'+dd}
						var mm = valuepassed.getMonth() +1;
						if(mm < 10)
							mm = '0'+mm;
						var yy = valuepassed.getFullYear();
						var passinterval = yy+'-'+mm+'-'+dd;
				}
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8852/api/getDashboardCountSuperadmin/'+passinterval+'/'+interval
              , dataType: 'jsonp'
          }).then(function (response) {
              $scope.DashboardCount = response.data;
		  });
			};
			
			
			
				$scope.getDashboardCountAdmin = function(interval,valuepassed)
			{
				if(interval =='month')
				{
					var mm = valuepassed.getMonth() +1;
						if(mm < 10)
							mm = '0'+mm;
						var yy = valuepassed.getFullYear();
						var passinterval = yy+'-'+mm;
				}
				if(interval =='day')
				{
					var dd = valuepassed.getDate()
					if(dd < 10)
					{dd = '0'+dd}
						var mm = valuepassed.getMonth() +1;
						if(mm < 10)
							mm = '0'+mm;
						var yy = valuepassed.getFullYear();
						var passinterval = yy+'-'+mm+'-'+dd;
				}
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8852/api/getDashboardCountAdmin/'+passinterval+'/'+interval+'/'+$scope.companyid+'/'+$scope.userid+'/'+$scope.userlevel
              , dataType: 'jsonp'
          }).then(function (response) {
              $scope.AdminDashboardCount = response.data;
		  });
			};
				/* ---------------------------------------DASHBOARD */
					
					/* COMPANY DETAILS------------------------------*/
					$scope.ListCompanies = function()
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/ListCompanies/'
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.companiesList = response.data;
						$scope.Toggleactions($scope.companiesList);
						});
					};
					
					$scope.ListCompaniesreferance = function()
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/ListCompaniesreferance/'
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.companiesidsList = response.data;
						});
					};
					
					$scope.GetCompanyDetails = function(companyid)
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/GetCompanyDetails/'+companyid
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.companyDetails = response.data;
						});
					};
					
					$scope.DeleteCompany = function(companyid)
					{
						
						swal({
						  title: "Are you sure?",
						  text: "You will not be able to recover this record again!",
						  type: "warning",
						  showCancelButton: true,
						  confirmButtonClass: "btn-danger",
						  confirmButtonText: "Yes, delete it!",
						  cancelButtonText: "No, cancel plx!",
						  closeOnConfirm: false,
						  closeOnCancel: false
						},
						function(isConfirm) {
						  if (isConfirm) {
							
							  $http({
							method: 'DELETE'
						, url: 'http://103.252.7.5:8852/api/DeleteCompany/'+companyid
						, dataType: 'jsonp'
						}).then(function (response) {
							swal({
									title: "",
									text: response.data.message,
									type: response.data.type
								}, function() {
									$scope.ListCompanies();
								});
						}); 
							
						  } else {
							swal("Cancelled", "Your record is safe :)", "error");
						  }
						});
					};
					
					$scope.SaveCompany = function()
					{
						$http({
							method  : 'POST',
							url     : 'http://103.252.7.5:8852/api/SaveCompany/',
							data    : $scope.companyDetails[0],
							headers : {'Content-Type': 'application/json'} 
						}).success(function(data) {
							swal({
									title: "",
									text: data.message,
									type: data.type
								}, function() {
									$scope.companyDetails = [];
									$scope.ListCompanies();
								});
							
						});
					};
					/* -----------------------------COMPANY DETAILS */
					
					
					
					/* PLANS DETAILS------------------------------*/
					$scope.ListPlans = function()
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/ListPlans/'
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.plansList = response.data;
						$scope.Toggleactions($scope.plansList);
						});
					};
					
					$scope.ListPlansreferance = function()
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/ListPlansreferance/'
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.plansidsList = response.data;
						});
					};
					
					$scope.GetPlanDetails = function(planid)
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/GetPlanDetails/'+planid
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.planDetails = response.data;
						});
					};
					
					$scope.DeletePlan = function(planid)
					{
						
						swal({
						  title: "Are you sure?",
						  text: "You will not be able to recover this record again!",
						  type: "warning",
						  showCancelButton: true,
						  confirmButtonClass: "btn-danger",
						  confirmButtonText: "Yes, delete it!",
						  cancelButtonText: "No, cancel plx!",
						  closeOnConfirm: false,
						  closeOnCancel: false
						},
						function(isConfirm) {
						  if (isConfirm) {
							
							  $http({
							method: 'DELETE'
						, url: 'http://103.252.7.5:8852/api/DeletePlan/'+planid
						, dataType: 'jsonp'
						}).then(function (response) {
							swal({
									title: "",
									text: response.data.message,
									type: response.data.type
								}, function() {
									$scope.ListPlans();
								});
						}); 
							
						  } else {
							swal("Cancelled", "Your record is safe :)", "error");
						  }
						});
					};
					
					$scope.SavePlan = function()
					{
						$http({
							method  : 'POST',
							url     : 'http://103.252.7.5:8852/api/SavePlan/',
							data    : $scope.planDetails[0],
							headers : {'Content-Type': 'application/json'} 
						}).success(function(data) {
							swal({
									title: "",
									text: data.message,
									type: data.type
								}, function() {
									$scope.planDetails = [];
									$scope.ListPlans();
								});
							
						});
					};
					/* -----------------------------PLANS DETAILS */


					
					/* USERS DETAILS------------------------------*/
					$scope.ListUsers = function()
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/ListUsers/'+$scope.userlevel+'/'+$scope.userid+'/'+$scope.companyid
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.UsersList = response.data;
						$scope.Toggleactions($scope.UsersList);
						});
					};
					
					
					$scope.GetUserDetails = function(userid)
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/GetUserDetails/'+userid
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.userDetails = response.data;
						});
					};
					
					$scope.DeleteUser = function(userid)
					{
						
						swal({
						  title: "Are you sure?",
						  text: "You will not be able to recover this record again!",
						  type: "warning",
						  showCancelButton: true,
						  confirmButtonClass: "btn-danger",
						  confirmButtonText: "Yes, delete it!",
						  cancelButtonText: "No, cancel plx!",
						  closeOnConfirm: false,
						  closeOnCancel: false
						},
						function(isConfirm) {
						  if (isConfirm) {
							
							  $http({
							method: 'DELETE'
						, url: 'http://103.252.7.5:8852/api/DeleteUser/'+userid
						, dataType: 'jsonp'
						}).then(function (response) {
							swal({
									title: "",
									text: response.data.message,
									type: response.data.type
								}, function() {
									$scope.ListUsers();
								});
						}); 
							
						  } else {
							swal("Cancelled", "Your record is safe :)", "error");
						  }
						});
					};
					
					$scope.SaveUser = function()
					{
						if( $scope.userDetails[0].companyid === null || $scope.userDetails[0].companyid === undefined)
						{
							$scope.userDetails[0].companyid = $scope.companyid;
						}
						$http({
							method  : 'POST',
							url     : 'http://103.252.7.5:8852/api/SaveUser/',
							data    : $scope.userDetails[0],
							headers : {'Content-Type': 'application/json'} 
						}).success(function(data) {
							swal({
									title: "",
									text: data.message,
									type: data.type
								}, function() {
									$scope.userDetails = [];
									$scope.ListUsers();
								});
							
						});
					};
					/* -----------------------------USERS DETAILS */
					
					
					
					/* PLANS ALLOCATIONS DETAILS------------------------------*/
					$scope.ListAllocatedPlans = function()
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/ListAllocatedPlans/'
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.companysplansList = response.data;
						$scope.Toggleactions($scope.companysplansList);
						});
					};
					
					$scope.GetAllocatedPlanDetails = function(planid)
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/GetAllocatedPlanDetails/'+planid
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.allocatedplanDetails = response.data;
						$scope.allocatedplanDetails[0].startingadte = new Date($scope.allocatedplanDetails[0].startingadte);
						$scope.allocatedplanDetails[0].validity = new Date($scope.allocatedplanDetails[0].validity);
						});
					};
					
					$scope.DeleteAllocatedPlan = function(planid)
					{
						
						swal({
						  title: "Are you sure?",
						  text: "You will not be able to recover this record again!",
						  type: "warning",
						  showCancelButton: true,
						  confirmButtonClass: "btn-danger",
						  confirmButtonText: "Yes, delete it!",
						  cancelButtonText: "No, cancel plx!",
						  closeOnConfirm: false,
						  closeOnCancel: false
						},
						function(isConfirm) {
						  if (isConfirm) {
							
							  $http({
							method: 'DELETE'
						, url: 'http://103.252.7.5:8852/api/DeleteAllocatedPlan/'+planid
						, dataType: 'jsonp'
						}).then(function (response) {
							swal({
									title: "",
									text: response.data.message,
									type: response.data.type
								}, function() {
									$scope.ListAllocatedPlans();
								});
						}); 
							
						  } else {
							swal("Cancelled", "Your record is safe :)", "error");
						  }
						});
					};
					
					$scope.SavePlanAllocation = function()
					{
						$http({
							method  : 'POST',
							url     : 'http://103.252.7.5:8852/api/SavePlanAllocation/',
							data    : $scope.allocatedplanDetails[0],
							headers : {'Content-Type': 'application/json'} 
						}).success(function(data) {
							swal({
									title: "",
									text: data.message,
									type: data.type
								}, function() {
									$scope.allocatedplanDetails = [];
									$scope.ListAllocatedPlans();
								});
							
						});
					};
					
					
					$scope.GetExpDate = function(AllocationDetails)
					{
						$http({
							method  : 'POST',
							url     : 'http://103.252.7.5:8852/api/GetExpDate/',
							data    : AllocationDetails,
							headers : {'Content-Type': 'application/json'} 
						}).success(function(data) {
							$scope.allocatedplanDetails[0].validity = new Date(data[0].expdate);
							$scope.allocatedplanDetails[0].amount = data[0].amount;
						});
					};
					/* -----------------------------PLANS ALLOCATIONS DETAILS */
					
					/* MEMBERS DETAILS--------------------------------------- */
					
					$scope.ListMembers = function()
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/ListMembers/'+$scope.userlevel+'/'+$scope.userid+'/'+$scope.companyid
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.MembersList = response.data;
						$scope.Toggleactions($scope.MembersList);
						});
					};
					
					$scope.Memberidref = function()
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/Memberidref/'+$scope.userlevel+'/'+$scope.userid+'/'+$scope.companyid
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.MembersidList = response.data;
						});
					};
					
					
					$scope.GetMemberDetails = function(memberid)
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/GetMemberDetails/'+memberid
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.membersDetails = response.data;
						});
					};
					
					$scope.DeleteMember = function(memberid)
					{
						
						swal({
						  title: "Are you sure?",
						  text: "You will not be able to recover this record again!",
						  type: "warning",
						  showCancelButton: true,
						  confirmButtonClass: "btn-danger",
						  confirmButtonText: "Yes, delete it!",
						  cancelButtonText: "No, cancel plx!",
						  closeOnConfirm: false,
						  closeOnCancel: false
						},
						function(isConfirm) {
						  if (isConfirm) {
							
							  $http({
							method: 'DELETE'
						, url: 'http://103.252.7.5:8852/api/DeleteMember/'+memberid
						, dataType: 'jsonp'
						}).then(function (response) {
							swal({
									title: "",
									text: response.data.message,
									type: response.data.type
								}, function() {
									$scope.ListMembers();
								});
						}); 
							
						  } else {
							swal("Cancelled", "Your record is safe :)", "error");
						  }
						});
					};
					
					$scope.SaveMember = function()
					{
						if( $scope.membersDetails[0].companyid === null || $scope.membersDetails[0].companyid === undefined)
						{
							$scope.membersDetails[0].companyid = $scope.companyid;
						}
						$http({
							method  : 'POST',
							url     : 'http://103.252.7.5:8852/api/SaveMember/',
							data    : $scope.membersDetails[0],
							headers : {'Content-Type': 'application/json'} 
						}).success(function(data) {
							swal({
									title: "",
									text: data.message,
									type: data.type
								}, function() {
									$scope.membersDetails = [];
									$scope.ListMembers();
								});
							
						});
					};
						
					/* ---------------------------------------MEMBERS DETAILS */
					
					/* CHIT DETAILS--------------------------------------- */
					
					$scope.ListChitDetails = function()
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/ListChitDetails/'+$scope.userlevel+'/'+$scope.userid+'/'+$scope.companyid
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.ChitsList = response.data;
						$scope.Toggleactions($scope.ChitsList);
						});
					};
					
					$scope.Chitidref = function()
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/Chitidref/'+$scope.userlevel+'/'+$scope.userid+'/'+$scope.companyid
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.ChitsidList = response.data;
						});
					};

					$scope.GetChitDetails = function(chitid)
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/GetChitDetails/'+chitid
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.chitsDetails = response.data;
						$scope.chitsDetails[0].fromdate = new Date($scope.chitsDetails[0].fromdate);
						$scope.chitsDetails[0].todate = new Date($scope.chitsDetails[0].todate);
						});
					};
					
					$scope.DeleteChit = function(chitid)
					{
						
						swal({
						  title: "Are you sure?",
						  text: "You will not be able to recover this record again!",
						  type: "warning",
						  showCancelButton: true,
						  confirmButtonClass: "btn-danger",
						  confirmButtonText: "Yes, delete it!",
						  cancelButtonText: "No, cancel plx!",
						  closeOnConfirm: false,
						  closeOnCancel: false
						},
						function(isConfirm) {
						  if (isConfirm) {
							
							  $http({
							method: 'DELETE'
						, url: 'http://103.252.7.5:8852/api/DeleteChit/'+chitid
						, dataType: 'jsonp'
						}).then(function (response) {
							swal({
									title: "",
									text: response.data.message,
									type: response.data.type
								}, function() {
									$scope.ListChitDetails();
								});
						}); 
							
						  } else {
							swal("Cancelled", "Your record is safe :)", "error");
						  }
						});
					};
					
					$scope.SaveChit = function()
					{
						if( $scope.chitsDetails[0].companyid === null || $scope.chitsDetails[0].companyid === undefined)
						{
							$scope.chitsDetails[0].companyid = $scope.companyid;
						}
						$http({
							method  : 'POST',
							url     : 'http://103.252.7.5:8852/api/SaveChit/',
							data    : $scope.chitsDetails[0],
							headers : {'Content-Type': 'application/json'} 
						}).success(function(data) {
							swal({
									title: "",
									text: data.message,
									type: data.type
								}, function() {
									$scope.chitsDetails = [];
									$scope.ListChitDetails();
								});
							
						});
					};
						
					/* ---------------------------------------CHIT DETAILS */
					
					/* CHIT MEMBER DETAILS--------------------------------------- */
					
					$scope.ListChitallocationDetails = function()
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/ListChitallocationDetails/'+$scope.userlevel+'/'+$scope.userid+'/'+$scope.companyid
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.ChitsallocatedList = response.data;
						$scope.Toggleactions($scope.ChitsallocatedList);
						});
					};
					

					$scope.GetChitallocationDetails = function(chitid)
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/GetChitallocationDetails/'+chitid
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.chitvsmember = response.data;
						$scope.chitvsmember[0].chitreceiptdate = new Date($scope.chitvsmember[0].chitreceiptdate);
						});
					};
					
					$scope.DeleteChitallocation = function(chitid)
					{
						
						swal({
						  title: "Are you sure?",
						  text: "You will not be able to recover this record again!",
						  type: "warning",
						  showCancelButton: true,
						  confirmButtonClass: "btn-danger",
						  confirmButtonText: "Yes, delete it!",
						  cancelButtonText: "No, cancel plx!",
						  closeOnConfirm: false,
						  closeOnCancel: false
						},
						function(isConfirm) {
						  if (isConfirm) {
							
							  $http({
							method: 'DELETE'
						, url: 'http://103.252.7.5:8852/api/DeleteChitallocation/'+chitid
						, dataType: 'jsonp'
						}).then(function (response) {
							swal({
									title: "",
									text: response.data.message,
									type: response.data.type
								}, function() {
									$scope.ListChitallocationDetails();
								});
						}); 
							
						  } else {
							swal("Cancelled", "Your record is safe :)", "error");
						  }
						});
					};
					
					$scope.SaveChitvsMenber = function()
					{
						if( $scope.chitvsmember[0].companyid === null || $scope.chitvsmember[0].companyid === undefined)
						{
							$scope.chitvsmember[0].companyid = $scope.companyid;
						}
						$http({
							method  : 'POST',
							url     : 'http://103.252.7.5:8852/api/SaveChitvsMenber/',
							data    : $scope.chitvsmember[0],
							headers : {'Content-Type': 'application/json'} 
						}).success(function(data) {
							swal({
									title: "",
									text: data.message,
									type: data.type
								}, function() {
									$scope.chitvsmember = [];
									$scope.ListChitallocationDetails();
								});
							
						});
					};
						
					/* ---------------------------------------CHIT MEMBERS DETAILS */
					
					
					/* CHIT PAYMENTS DETAILS--------------------------------------- */
					
					$scope.ListChitPaymentDetails = function()
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/ListChitPaymentDetails/'+$scope.userlevel+'/'+$scope.userid+'/'+$scope.companyid
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.Toggleactions(response.data);
						});
					};
					

					$scope.GetChitPaymentDetails = function(chitid)
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/GetChitPaymentDetails/'+chitid
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.chitPaymentDetails = response.data;
						$scope.chitPaymentDetails[0].paymentdate = new Date($scope.chitPaymentDetails[0].paymentdate);
						});
					};
					
					$scope.DeleteChitPayment = function(chitid)
					{
						
						swal({
						  title: "Are you sure?",
						  text: "You will not be able to recover this record again!",
						  type: "warning",
						  showCancelButton: true,
						  confirmButtonClass: "btn-danger",
						  confirmButtonText: "Yes, delete it!",
						  cancelButtonText: "No, cancel plx!",
						  closeOnConfirm: false,
						  closeOnCancel: false
						},
						function(isConfirm) {
						  if (isConfirm) {
							
							  $http({
							method: 'DELETE'
						, url: 'http://103.252.7.5:8852/api/DeleteChitPayment/'+chitid
						, dataType: 'jsonp'
						}).then(function (response) {
							swal({
									title: "",
									text: response.data.message,
									type: response.data.type
								}, function() {
									$scope.ListChitPaymentDetails();
								});
						}); 
							
						  } else {
							swal("Cancelled", "Your record is safe :)", "error");
						  }
						});
					};
					
					$scope.SaveChitPayment = function()
					{
						if( $scope.chitPaymentDetails[0].companyid === null || $scope.chitPaymentDetails[0].companyid === undefined)
						{
							$scope.chitPaymentDetails[0].companyid = $scope.companyid;
						}
						$http({
							method  : 'POST',
							url     : 'http://103.252.7.5:8852/api/SaveChitPayment/',
							data    : $scope.chitPaymentDetails[0],
							headers : {'Content-Type': 'application/json'} 
						}).success(function(data) {
							swal({
									title: "",
									text: data.message,
									type: data.type
								}, function() {
									$scope.chitPaymentDetails = [];
									$scope.ListChitPaymentDetails();
								});
							
						});
					};
						
					/* ---------------------------------------CHIT PAYMENT DETAILS */
					
					
					/* CHIT RECEIPT DETAILS--------------------------------------- */
					
					$scope.ListchitReceiptDetails = function()
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/ListchitReceiptDetails/'+$scope.userlevel+'/'+$scope.userid+'/'+$scope.companyid
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.Toggleactions(response.data);
						});
					};
					

					$scope.GetchitReceiptDetails = function(chitid)
					{
						$http({
						method: 'GET'
						, url: 'http://103.252.7.5:8852/api/GetchitReceiptDetails/'+chitid
						, dataType: 'jsonp'
						}).then(function (response) {
						$scope.chitReceiptDetails = response.data;
						$scope.chitReceiptDetails[0].recieptdate = new Date($scope.chitReceiptDetails[0].recieptdate);
						});
					};
					
					$scope.DeleteChitReceipt = function(chitid)
					{
						
						swal({
						  title: "Are you sure?",
						  text: "You will not be able to recover this record again!",
						  type: "warning",
						  showCancelButton: true,
						  confirmButtonClass: "btn-danger",
						  confirmButtonText: "Yes, delete it!",
						  cancelButtonText: "No, cancel plx!",
						  closeOnConfirm: false,
						  closeOnCancel: false
						},
						function(isConfirm) {
						  if (isConfirm) {
							
							  $http({
							method: 'DELETE'
						, url: 'http://103.252.7.5:8852/api/DeleteChitReceipt/'+chitid
						, dataType: 'jsonp'
						}).then(function (response) {
							swal({
									title: "",
									text: response.data.message,
									type: response.data.type
								}, function() {
									$scope.ListchitReceiptDetails();
								});
						}); 
							
						  } else {
							swal("Cancelled", "Your record is safe :)", "error");
						  }
						});
					};
					
					$scope.SaveChitReceipt = function()
					{
						if( $scope.chitReceiptDetails[0].companyid === null || $scope.chitReceiptDetails[0].companyid === undefined)
						{
							$scope.chitReceiptDetails[0].companyid = $scope.companyid;
						}
						$http({
							method  : 'POST',
							url     : 'http://103.252.7.5:8852/api/SaveChitReceipt/',
							data    : $scope.chitReceiptDetails[0],
							headers : {'Content-Type': 'application/json'} 
						}).success(function(data) {
							swal({
									title: "",
									text: data.message,
									type: data.type
								}, function() {
									$scope.chitReceiptDetails = [];
									$scope.ListchitReceiptDetails();
								});
							
						});
					};
						
					/* ---------------------------------------CHIT PAYMENT DETAILS */

					
});