  var loginApp = angular.module('loginApp', ['ui.bootstrap']).filter('startFrom', function () {
    return function (input, start) {
        start = +start;
		if(input!=undefined)
        {return input.slice(start);}
    }
});
  loginApp.controller('loginController', function($scope, $http,$window) {   
  
	  $scope.uneditablefullname = true;
	  $scope.uneditableUsername = true;
	  $scope.uneditableemail = true;
	  $scope.uneditablephone = true;
	var socket = io();
			$scope.cartlength = 0;
			$scope.notificationcount = 0;
			
			document.addEventListener("deviceready",onDeviceReady,false);
						function onDeviceReady(){
						
						}
			
			$scope.checkcurrpage=function(myValue){ 
			if(myValue == null)
				myValue = 1;
		if(!myValue){
		 window.document.getElementById("mypagevalue").value = $scope.currentPage+1;
		 var element = window.document.getElementById("mypagevalue");
		 if(element)
			 element.focus();
		$scope.currentPage = $scope.currentPage;
		$scope.myValue = null;
		}
		
		else{$scope.dispval = "";
		if(myValue-1 <= 0){
			$scope.currentPage=0;
		}else{$scope.currentPage=myValue-1;
				if(!$scope.currentPage){$scope.currentPage=0;}			}
		}};
	
  $scope.errormsg = false;
  $scope.submitForm = function() {
  $http({
         method  : 'POST',
         url     : 'http://103.252.7.5:8086/api/user/auth',
         data    : $scope.user,
         headers : {'Content-Type': 'application/json'} 
    })
    .success(function(data) {
      if (!data.success) {
        $scope.errormMessage = data.message;
          $scope.errormsg = true;
      } else {
      $window.sessionStorage["token"] = JSON.stringify(data.token);
      $window.sessionStorage["username"] = JSON.stringify(data.username);
      $window.sessionStorage["userid"] = JSON.stringify(data.userId);
      $window.sessionStorage["Userlevel"] = JSON.stringify(data.Userlevel);
      $window.sessionStorage["custid"] = JSON.stringify(data.custid);
      $window.sessionStorage["companyid"] = JSON.stringify(data.companyid);
      $window.sessionStorage["companyname"] = JSON.stringify(data.companyname);

	  $window.localStorage["token"] = JSON.stringify(data.token);
      $window.localStorage["username"] = JSON.stringify(data.username);
      $window.localStorage["userid"] = JSON.stringify(data.userId);
      $window.localStorage["Userlevel"] = JSON.stringify(data.Userlevel);
      $window.localStorage["custid"] = JSON.stringify(data.custid);
      $window.localStorage["companyid"] = JSON.stringify(data.companyid);
      $window.localStorage["companyname"] = JSON.stringify(data.companyname);
    
			$scope.username = $window.localStorage["username"];
			$scope.username=$scope.username.replace(/\"/g,""); 
			$scope.companyname = $window.localStorage["companyname"];
			$scope.companyname=$scope.companyname.replace(/\"/g,""); 
			$scope.userid = $window.localStorage["userid"];
			$scope.userlevel = $window.localStorage["Userlevel"];
			$scope.userlevel = $scope.userlevel.replace(/\"/g,""); 
			$window.location.href='./Dashboard.html';
					
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
	}
	
			
	
	
	$scope.ListUser = function () {
          $http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/userList/'
              , dataType: 'jsonp'
          }).then(function (response) {
              $scope.userList = response.data;
			  
			  $scope.currentPage = 0;
					$scope.pageSize = 10;
					if($scope.myValue > $scope.userList.length)
					{
						$scope.myValue = 1;
					}
					$scope.numberOfPages = function () {
					return Math.ceil($scope.userList.length / $scope.pageSize);
		};
			  
          });
		  
      };
	  
	  $scope.setPage = function (pageNo) {
			 $scope.currentPage = pageNo;
				};
			 $scope.filter = function () {
			 $timeout(function () {
			 $scope.filteredItems = $scope.userList.length;
				}, 10);
			};
			$scope.sort = function (column) {
			if ($scope.orderProp === column) {
            $scope.direction = !$scope.direction;
			} else {
            $scope.orderProp = column;
            $scope.direction = false;
			}
		};
		
	  $scope.getUserData = function (userid) {
          $http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/userdetails/'+userid
              , dataType: 'jsonp'
          }).then(function (response) {
              $scope.userDetails = response.data;
			  console.log($scope.userDetails);
          });
		  
      };
	  $scope.DeleteUser = function (userid) {
		  var yes = confirm("Are You Sure?")
		  if(yes)
		  {
          $http({
              method: 'DELETE'
              , url: 'http://103.252.7.5:8086/api/userdelete/'+userid
              , dataType: 'jsonp'
          }).then(function (response) {
			  alert(response.data.message);
                  $scope.ListUser();
          });
		  }
		  else
		  {}
		  
      };
	  
	  /* 'DISTRIBUTOR', */
	$scope.userlevelarray = ['HO','DEPO','SUPER STORE','ASM','SO','SR'];
	
	$scope.ListCustomers = function()
			{
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/ListCustomers/'
              , dataType: 'jsonp'
          }).then(function (response) {
              $scope.CustomerList = response.data;
			  console.log($scope.CustomerList);
		  });
			};
	
	  $scope.getsupervisordetails = function (userlevel) {
          $http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/userlevelcheck/'+userlevel
              , dataType: 'jsonp'
          }).then(function (response) {
              $scope.supervisordetailsarr = response.data;
          });
		  
      };
         $scope.getCustomerData = function(item)
		 {
			$scope.entityid = item.id; 
		 }
		
		$scope.newUser = function() {
			if($scope.user.userlevel != 'HO' && $scope.user.supervisor == undefined)
			{
			 document.getElementById("supervisor").style.borderColor = "red";
			}
			else
			{
				$scope.user.entityid = $scope.entityid;
				
				document.getElementById("supervisor").style.borderColor = "";
  $http({
         method  : 'POST',
         url     : 'http://103.252.7.5:8086/api/user/',
         data    : $scope.user,
         headers : {'Content-Type': 'application/json'} 
    })
    .success(function(data) {
      if (!data.success) {
        $scope.formMessage = data.message;
        alert("Thank U ! You are Successfully Regestered.");
					$scope.user = {};
                  $scope.ListUser();
      } else {
          alert("Something Wrong ! please fill form again.");
      }
    });
			}
  };
  
  $scope.EditUser = function() {
  $http({
         method  : 'POST',
         url     : 'http://103.252.7.5:8086/api/userEdit/',
         data    : $scope.userDetails,
         headers : {'Content-Type': 'application/json'} 
    })
    .success(function(data) {
				alert(data.message);
                  $scope.ListUser();
    });
  };
	  
	  $scope.UploadUsers = function(userdetails) {
  $http({
         method  : 'POST',
         url     : 'http://103.252.7.5:8086/api/UploadUsers/',
         data    : userdetails,
         headers : {'Content-Type': 'application/json'} 
    })
    .success(function(data) {
				alert(data.message);
                  $scope.ListUser();
    });
  };
	  
	  
	  $scope.EditProfileUsername = function(field,value,id) {
  $http({
         method  : 'POST',
         url     : 'http://103.252.7.5:8086/api/userProfileEdit/'+field+'/'+value+'/'+id,
         headers : {'Content-Type': 'application/json'} 
    })
    .success(function(data) {
      if (!data.success) {
        $scope.formMessage = data.message;
		  $window.sessionStorage["username"] = JSON.stringify(value);
          $window.location.reload();
       
      } else {
         
      }
    });
  }; 
	  $scope.EditProfile = function(field,value,id) {
  $http({
         method  : 'POST',
         url     : 'http://103.252.7.5:8086/api/userProfileEdit/'+field+'/'+value+'/'+id,
         headers : {'Content-Type': 'application/json'} 
    })
    .success(function(data) {
      if (!data.success) {
        $scope.formMessage = data.message;
      } else {
         
      }
    });
  };
      
      //    FORGOT PASSWORD
    
     $scope.verifyuser = function (usercheck) {
          $http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/userduplicatecheck/' + usercheck
              , dataType: 'jsonp'
          }).then(function (response) {
              $scope.uservalidity = response.data;
              if ($scope.uservalidity.length === 0) {
                  $scope.dispuserduplicate1 = "User Does Not Exists";
              }
              else {
                  $scope.dispuserduplicate1 = "";
              }
          });
      };
	  
    $scope.verifyemail = function (usercheck,email) {
        $http({
            method: 'GET'
            , url: 'http://103.252.7.5:8086/api/emailduplicatecheck/' + usercheck +'/'+email
            , dataType: 'jsonp'
        }).then(function (response) {
            $scope.uservalidity = response.data;
            console.log($scope.uservalidity.length);
            if ($scope.uservalidity.length < 1) {
                 $scope.dispnoemail = "Username and Email ID Combination Does Not Exists";
                }
                else {
                  
                    $scope.dispnoemail = "";
                }
            
        });
    };
    
          $scope.submitForgetpwd = function () {
          $http({
              method: 'POST'
              , url: 'http://103.252.7.5:8086/api/user/forgetpwd/'
              , data: $scope.user
              , headers: {
                  'Content-Type': 'application/json'
              }
          }).then(function (response) {
              console.log(String(response.data).substr(0,6));
              if (String(response.data).substr(0,6) == '250 ok') {
                  alert('Password has been sent to your registered Email ID.');
                 location.reload();
              }
          });
      };
     
      $scope.GetUserDetails = function()
      {
         $scope.username = $window.sessionStorage["username"];
          $scope.username=$scope.username.replace(/\"/g,""); 
		  
           
		  
		  $scope.userid = $window.sessionStorage["userid"];
        $http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/GetUserDetails/' + $scope.userid
              , dataType: 'jsonp'
          }).then(function (response) {
              $scope.UserData = response.data;
          });  
      };
      
    //    RESET PASSWORD
     $scope.verifyOldpassword = function(){
         $scope.user.username=$window.sessionStorage["username"];
         $scope.newuser=$scope.user.username.replace(/\"/g,"");
		  $http({
				 method  : 'GET',
				 url     : 'http://103.252.7.5:8086/api/userpasswdcheck/'+$scope.user.oldpassw+'/'+$scope.newuser,
				 data    : $scope.user,
				 headers : {'Content-Type': 'application/json'} 
			})
			.success(function(data) { 
			  if (data.length<1) {
				$scope.dispoldpwsswrng = "Incorrect Password";
				var element = $window.document.getElementById("oldpassw");
				if(element)
					{element.focus();}
				}
				else{$scope.dispoldpwsswrng="";}
			});
	};
    
    $scope.verifynewpassword = function(){
	
			
			 if($scope.user.newpassw.length<=8)
			 {
				 $scope.dispnewoldpasswrng1 = "Minimum Length 8";
				 var element = $window.document.getElementById("newpassw");
				 if(element)
					{element.focus();}
			 }
			 
			 else{$scope.dispnewoldpasswrng1="";}
			  if ($scope.user.newpassw === $scope.user.oldpassw) {
				$scope.dispnewoldpasswrng = "New password cannot be same as old password";
				var element = $window.document.getElementById("newpassw");
				if(element)
					{element.focus();}
				}
				else{$scope.dispnewoldpasswrng="";
				
				}
				
};

    $scope.verifypasswequal = function(){
				
			/* alert($scope.user.newpassw+" "+$scope.user.verifynewpassw); */
			  if ($scope.user.newpassw !== $scope.user.verifynewpassw) {
				$scope.dispnewpasswrng = "New and Confirm Passwords doesn’t match";
				var element = $window.document.getElementById("newpassw");
				if(element)
					{}
				}
				else{$scope.dispnewpasswrng="";}
};
    
    	$scope.submitpwdreset = function(){
		  $http({
				 method  : 'POST',
				 url     : 'http://103.252.7.5:8086/api/updateresetpassw/',
				 data    : $scope.user,
				 headers : {'Content-Type': 'application/json'} 
			})
			.success(function(data) {
			  if (!data.success) {
				$scope.formMessage = data.message;
			  if($scope.formMessage==='Your Password has been changed...')
			  {
				  alert('Your Password has been changed...');
                  if(data)
                      {
                     $window.location.reload();
                      }
			  }
			  else{
				   alert('Sorry, something wrong...');
                    $window.location.reload();
              }
			  }
			  else{}
			});

};


	  
	   $scope.setPage = function (pageNo) {
			 $scope.currentPage = pageNo;
				};
			 $scope.filter = function () {
			 $timeout(function () {
			 $scope.filteredItems = $scope.userAttendanceList.length;
				}, 10);
			};
			$scope.sort = function (column) {
			if ($scope.orderProp === column) {
            $scope.direction = !$scope.direction;
			} else {
            $scope.orderProp = column;
            $scope.direction = false;
			}
		};
	
		socket.on('serverEventLiveUpdate', function(data){
					console.log(data);
					socket.emit('disconnect',data);
					});
		
		
		
		/* ATTENDANCE */
		
		var dd = new Date().getDate();
		if(dd < 10)
			dd = '0'+dd;
		
		var mm = new Date().getMonth() + 1;
		if(mm < 10)
			mm = '0'+mm;
		var yy = new Date().getFullYear();
		
		$scope.CurrentDate = dd+'/'+mm+'/'+yy;
		
			$scope.ResetOuttime = function(attid)
			{
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/ResetOuttime/'+attid
              , dataType: 'jsonp'
          }).then(function (response) {
             if(response.data.status == 1)
			 {
				 alert('Something went wrong,please try again.')
			 }
			 else
			 {
				 $scope.getAttendanceList(new Date());
			 }
		  });
			};
			
			
			$scope.CheckAttendanceStatus = function()
			{
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/getattendancestatus/'+$scope.userid
              , dataType: 'jsonp'
          }).then(function (response) {
              $scope.AttendanceStatus = response.data;
			  if($scope.AttendanceStatus[0] != undefined)
			  {
			  if($scope.AttendanceStatus[0].status == 'in')
			  {
				  document.getElementById("attendance").style.color = "#4cff00";
			  }
			  }
		  });
			};
			
			
			$scope.setMyAttendance = function()
			{
				navigator.geolocation.getCurrentPosition(showPosition);
				function showPosition(position) {
						  $http(
								{
									method: 'GET',
									url: "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + position.coords.latitude + ","+ position.coords.longitude + "&sensor=true",
									dataType: 'jsonp'
								 }
							)
						  .then(function(response){
							  $scope.address=response.data.results[0].formatted_address;
						 
  
					   currentLocation = {
							userid : $scope.userid,
							lat : position.coords.latitude,
							lan : position.coords.longitude,
							address:$scope.address
						}; 
				$http({
				 method  : 'POST',
				 url     : 'http://103.252.7.5:8086/api/userAttendance/',
				 data    : currentLocation,
				 headers : {'Content-Type': 'application/json'} 
			})
			.success(function(data) {
				$scope.CheckAttendanceStatus();
				if(data.status == 4)
				{
					 localStorage.clear(); 
					sessionStorage.clear();
					$window.location.href="index.html";
					
				}
			});
			});
						  };
			};
			/* -------------- */
		
		/* ----------------------------------------Vishwajeet-------------------------------------- */
		
		$scope.addbankdetails = function() {
				
				console.log($scope.bank);
				
  $http({
         method  : 'POST',
         url     : 'http://103.252.7.5:8086/api/addbankdetails/',
         data    : $scope.bank,
         headers : {'Content-Type': 'application/json'} 
    })
    .success(function(data) {
      if (!data.success) {
        $scope.formMessage = data.message;
        alert("Thank U ! You are Successfully Regestered.");
					$scope.bank = {};
                  $scope.bankList();
      } else {
          alert("Something Wrong ! please fill form again.");
      }
    });
		
  };
  
  $scope.getbankData = function (id) {
          $http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/getbankData/'+id
              , dataType: 'jsonp'
          }).then(function (response) {
              $scope.bankDetails = response.data;
			  console.log($scope.bankDetails);
          });
		  
      };
	  
	  $scope.bankList = function () {
          $http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/bankList/'
              , dataType: 'jsonp'
          }).then(function (response) {
              $scope.bankListdata = response.data;
			  
			  $scope.currentPage = 0;
					$scope.pageSize = 10;
					if($scope.myValue > $scope.bankListdata.length)
					{
						$scope.myValue = 1;
					}
					$scope.numberOfPages = function () {
					return Math.ceil($scope.bankListdata.length / $scope.pageSize);
		};
			  
          });
		  
      };
	  
	  $scope.Editbank = function() {
  $http({
         method  : 'POST',
         url     : 'http://103.252.7.5:8086/api/Editbank/',
         data    : $scope.bankDetails,
         headers : {'Content-Type': 'application/json'} 
    })
    .success(function(data) {
				alert(data.message);
                  $scope.bankList();
    });
  };
  
  $scope.bankdelete = function (id) {
		  var yes = confirm("Are You Sure?")
		  if(yes)
		  {
          $http({
              method: 'DELETE'
              , url: 'http://103.252.7.5:8086/api/bankdelete/'+id
              , dataType: 'jsonp'
          }).then(function (response) {
			  alert(response.data.message);
                  $scope.bankList();
          });
		  }
		  else
		  {}
		  
      };
	  
	  $scope.ListCustomers = function()
			{
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/ListCustomers/'
              , dataType: 'jsonp'
          }).then(function (response) {
              $scope.CustomerList = response.data;
			  
					$scope.currentPage = 0;
					$scope.pageSize = 10;
					if($scope.myValue > $scope.CustomerList.length)
					{
						$scope.myValue = 1;
					}
					$scope.numberOfPagescustomer = function () {
					return Math.ceil($scope.CustomerList.length / $scope.pageSize);
    };
			  
		  });
			};
  
   
   
   $scope.setMyCurrentBeatarea = function(beatareaid)
			{
				$window.localStorage["beatareaid"] = JSON.stringify(beatareaid);
			}
				$scope.GetUserBeats = function()
			{
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/GetUserBeatsList/'+$scope.userid
              , dataType: 'jsonp'
          }).then(function (response) {
              $scope.BeatList = response.data;
		  });
			}
   
   
   $scope.SendNotification = function(orderid)
			{
				$http({
              method: 'GET'
              , url: 'http://103.252.7.5:8086/api/SendNotification/'
              , dataType: 'jsonp'
			}).then(function (response) {
        
			});
			};
			
});