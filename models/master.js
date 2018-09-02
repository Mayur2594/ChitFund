var connection = require('../connection');

function master() {
	
	this.authUser = function (userdetails, res) {
		connection.acquire(function (err, con) {
			con.query("SELECT `id`,`fullname`,`userlevel`,`companyid`,(CASE WHEN usermaster.companyid = 0 THEN 'Super Company' WHEN usermaster.companyid != 0 THEN (SELECT companymaster.name FROM companymaster WHERE companymaster.id = usermaster.companyid) END) as companyname FROM `usermaster` WHERE username = ? AND password = ?",[userdetails.username,userdetails.password], function (err, result) {
				if(err)
				{
					res.send({status:0,message:'Something went wrong , please try again'});
					con.release();
				}
				else
				{
					if(result.length > 0)
					{
						res.send({success:true,data:result[0]});
					}
					else
					{
						res.send({success:false,message:'Login cridentials does not match.!'})
						con.release();
					}
				}
			});
		});
	};   
	
	
	this.getDashboardCountSuperadmin = function (passinterval,interval, res) {
		connection.acquire(function (err, con) {
			if(interval === 'month')
			{
				var sql = "SELECT (SELECT COUNT(*) FROM companymaster) as totalcompanies,(SELECT COUNT(*) FROM usermaster) as totalusers,(SELECT COUNT(*) FROM plans) as totalplans,IFNULL((SELECT SUM(planallocation.amount) FROM planallocation WHERE planallocation.amtpaid = 1 AND DATE_FORMAT(planallocation.reneweddate,'%Y-%m') = '"+passinterval+"'),0) as collectedamt FROM usermaster LIMIT 1"
			}
			if(interval === 'day')
			{
				var sql = "SELECT (SELECT COUNT(*) FROM companymaster) as totalcompanies,(SELECT COUNT(*) FROM usermaster) as totalusers,(SELECT COUNT(*) FROM plans) as totalplans,IFNULL((SELECT SUM(planallocation.amount) FROM planallocation WHERE planallocation.amtpaid = 1 AND DATE_FORMAT(planallocation.reneweddate,'%Y-%m-%d') = '"+passinterval+"'),0) as collectedamt FROM usermaster LIMIT 1"
			}
			con.query(sql, function (err, result) {
				if(err)
				{
					res.send({status:0,message:'Something went wrong , please try again'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};   
	
	
	this.getDashboardCountAdmin = function (passinterval,interval,companyid,userid,userlevel,res) {
		connection.acquire(function (err, con) {
			if(interval === 'month')
			{
				var sql = "SELECT (SELECT COUNT(*) FROM member_master WHERE member_master.companyid = "+companyid+") as totalmembers,(SELECT COUNT(*) FROM chit_master WHERE chit_master.companyid = "+companyid+") as totalchits,IFNULL((SELECT SUM(chitpayments.amount) FROM chitpayments WHERE chitpayments.companyid = "+companyid+" AND DATE_FORMAT(chitpayments.paymentdate,'%Y-%m') = '"+passinterval+"'),0) as totalchitpayment,IFNULL((SELECT SUM(chitreciepts.amount) from chitreciepts WHERE chitreciepts.companyid = "+companyid+" AND DATE_FORMAT(chitreciepts.recieptdate,'%Y-%m') = '"+passinterval+"'),0) as totalchitreceipt FROM `usermaster` WHERE usermaster.companyid = "+companyid+"  LIMIT 1"
			}
			if(interval === 'day')
			{
				var sql = "SELECT (SELECT COUNT(*) FROM member_master WHERE member_master.companyid = "+companyid+") as totalmembers,(SELECT COUNT(*) FROM chit_master WHERE chit_master.companyid = "+companyid+") as totalchits,IFNULL((SELECT SUM(chitpayments.amount) FROM chitpayments WHERE chitpayments.companyid = "+companyid+" AND DATE_FORMAT(chitpayments.paymentdate,'%Y-%m-%d') = '"+passinterval+"'),0) as totalchitpayment,IFNULL((SELECT SUM(chitreciepts.amount) from chitreciepts WHERE chitreciepts.companyid = "+companyid+" AND DATE_FORMAT(chitreciepts.recieptdate,'%Y-%m-%d') = '"+passinterval+"'),0) as totalchitreceipt FROM `usermaster` WHERE usermaster.companyid = "+companyid+"  LIMIT 1"
			}
			con.query(sql, function (err, result) {
				if(err)
				{
					res.send({status:0,message:'Something went wrong , please try again'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};   
	
	
	/* COMPANY DETAILS------------------------------------------- */
	
	this. SaveCompany = function (companydetails, res) {
		connection.acquire(function (err, con) {
			
			con.query('SELECT * FROM `companymaster` WHERE name = ? AND owner = ? AND id is NOT null',[companydetails.name,companydetails.owner], function (err, result) {
				console.log(err)
				if(err)
				{
					res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
					con.release();
				}
				else
				{
					if(result.length > 0 && !companydetails.id)
					{
						res.send({status:2,message:'Company details already exist',type:'error'})
					}
					else
					{
						if(companydetails.id)
						{
							con.query('UPDATE `companymaster` SET ? WHERE id = ?',[companydetails,companydetails.id], function (err, result) {
								console.log(err)
								if(err)
								{
									res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
									con.release();
								}
								else
								{
									res.send({status:1,message:'Company details updated successfully',type:'success'})
									con.release();
								}
							})
						}
						
						else
						{
							con.query('INSERT INTO `companymaster` SET ?',companydetails, function (err, result) {
								console.log(err)
								if(err)
								{
									res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
									con.release();
								}
								else
								{
									res.send({status:1,message:'Company details inserted successfully',type:'success'})
									con.release();
								}
							})
						}
					}
				}
			});
		});
	};   
	
	this. ListCompanies = function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM `companymaster` ORDER BY id desc', function (err, result) {
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};   
	
	this. ListCompaniesreferance = function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT id,name FROM `companymaster` ORDER BY id desc', function (err, result) {
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};   
	
	this. GetCompanyDetails = function (companyid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM `companymaster` WHERE id ='+companyid, function (err, result) {
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};   
	
	this. DeleteCompany = function (companyid, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `companymaster` WHERE id ='+companyid, function (err, result) {
				if(err)
				{
					res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
					con.release();
				}
				else
				{
					res.send({status:1,message:'Company details deleted successfully',type:'success'})
					con.release();
				}
			});
		});
	};   
	
	/* ------------------------------------COMPANY DETAILS */
	
	/* PLAN DETAILS------------------------------------------- */
	
	this. SavePlan = function (plandetails, res) {
		connection.acquire(function (err, con) {
			
			con.query('SELECT * FROM `plans` WHERE name = ? AND id is NOT null',[plandetails.name], function (err, result) {
				console.log(err)
				if(err)
				{
					res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
					con.release();
				}
				else
				{
					if(result.length > 0 && !plandetails.id)
					{
						res.send({status:2,message:'Plan details already exist',type:'error'})
					}
					else
					{
						if(plandetails.id)
						{
							con.query('UPDATE `plans` SET ? WHERE id = ?',[plandetails,plandetails.id], function (err, result) {
								console.log(err)
								if(err)
								{
									res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
									con.release();
								}
								else
								{
									res.send({status:1,message:'Plan details updated successfully',type:'success'})
									con.release();
								}
							})
						}
						
						else
						{
							con.query('INSERT INTO `plans` SET ?',plandetails, function (err, result) {
								console.log(err)
								if(err)
								{
									res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
									con.release();
								}
								else
								{
									res.send({status:1,message:'Plan details inserted successfully',type:'success'})
									con.release();
								}
							})
						}
					}
				}
			});
		});
	};   
	
	this. ListPlans = function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM `plans` ORDER BY id desc', function (err, result) {
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};   
	
	this. ListPlansreferance = function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT id,name,amount FROM `plans` ORDER BY id desc', function (err, result) {
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};   
	
	this. GetPlanDetails = function (planid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM `plans` WHERE id ='+planid, function (err, result) {
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};   
	
	this. DeletePlan = function (planid, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `plans` WHERE id ='+planid, function (err, result) {
				if(err)
				{
					res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
					con.release();
				}
				else
				{
					res.send({status:1,message:'Plan details deleted successfully',type:'success'})
					con.release();
				}
			});
		});
	};   
	
	/* ------------------------------------PLAN DETAILS */
	
	/* USERS DETAILS------------------------------------------- */
	
	this. SaveUser = function (userdetails, res) {
		connection.acquire(function (err, con) {
			
			con.query('SELECT * FROM `usermaster` WHERE `mobile` =? AND `companyid` =? AND `username`=?',[userdetails.mobile,userdetails.companyid,userdetails.username], function (err, result) {
				console.log(err)
				if(err)
				{
					res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
					con.release();
				}
				else
				{
					if(result.length > 0 && !userdetails.id)
					{
						res.send({status:2,message:'User`s details already exist',type:'error'})
					}
					else
					{
						if(userdetails.id)
						{
							con.query('UPDATE `usermaster` SET ? WHERE id = ?',[userdetails,userdetails.id], function (err, result) {
								console.log(err)
								if(err)
								{
									res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
									con.release();
								}
								else
								{
									res.send({status:1,message:'User`s details updated successfully',type:'success'})
									con.release();
								}
							})
						}
						
						else
						{
							con.query('INSERT INTO `usermaster` SET ?',userdetails, function (err, result) {
								console.log(err)
								if(err)
								{
									res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
									con.release();
								}
								else
								{
									res.send({status:1,message:'User`s details inserted successfully',type:'success'})
									con.release();
								}
							})
						}
					}
				}
			});
		});
	};   
	
	this. ListUsers = function (userlevel,userid,companyid, res) {
		connection.acquire(function (err, con) {
			if(userlevel === 'Superadmin')
			{
				var sql = "SELECT `id`,`fullname`,`mobile`,`email`,(CASE WHEN usermaster.companyid = 0 THEN 'Super Company' WHEN usermaster.companyid != 0 THEN (SELECT companymaster.name FROM companymaster WHERE companymaster.id = usermaster.companyid) END) as companyname FROM `usermaster` ORDER BY id DESC"
			}
			if(userlevel !== 'Superadmin')
			{
				var sql = "SELECT `id`,`fullname`,`mobile`,`email`,(SELECT companymaster.name FROM companymaster WHERE companymaster.id = usermaster.companyid) as companyname FROM `usermaster` WHERE usermaster.companyid = "+companyid+"  ORDER BY id DESC"
			}
			con.query(sql, function (err, result) {
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};   
	
	
	
	this. GetUserDetails = function (uerid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM `usermaster` WHERE id ='+uerid, function (err, result) {
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};   
	
	this. DeleteUser = function (uerid, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `usermaster` WHERE id ='+uerid, function (err, result) {
				if(err)
				{
					res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
					con.release();
				}
				else
				{
					res.send({status:1,message:'Plan details deleted successfully',type:'success'})
					con.release();
				}
			});
		});
	};   
	
	/* ------------------------------------USERS DETAILS */
	
	/* MEMBERS DETAILS------------------------------------------- */
	
	this. SaveMember = function (memberdetails, res) {
		connection.acquire(function (err, con) {
			
			con.query('SELECT * FROM `member_master` WHERE `mobile` =? AND `companyid` =? AND `email`= ?',[memberdetails.mobile,memberdetails.companyid,memberdetails.email], function (err, result) {
				console.log(err)
				if(err)
				{
					res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
					con.release();
				}
				else
				{
					if(result.length > 0 && !memberdetails.id)
					{
						res.send({status:2,message:'Member`s details already exist',type:'error'})
					}
					else
					{
						if(memberdetails.id)
						{
							con.query('UPDATE `member_master` SET ? WHERE id = ?',[memberdetails,memberdetails.id], function (err, result) {
								console.log(err)
								if(err)
								{
									res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
									con.release();
								}
								else
								{
									res.send({status:1,message:'Member`s details updated successfully',type:'success'})
									con.release();
								}
							})
						}
						
						else
						{
							con.query('INSERT INTO `member_master` SET ?',memberdetails, function (err, result) {
								console.log(err)
								if(err)
								{
									res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
									con.release();
								}
								else
								{
									res.send({status:1,message:'Member`s details inserted successfully',type:'success'})
									con.release();
								}
							})
						}
					}
				}
			});
		});
	};   
	
	this. ListMembers = function (userlevel,userid,companyid, res) {
		connection.acquire(function (err, con) {
			if(userlevel === 'Superadmin')
			{
				var sql = "SELECT `id`,`name`,`mobile`,`email`,(SELECT companymaster.name FROM companymaster WHERE companymaster.id = member_master.companyid) as companyname FROM `member_master` ORDER BY id DESC"
			}
			if(userlevel !== 'Superadmin')
			{
				var sql = "SELECT `id`,`name`,`mobile`,`email` FROM `member_master` WHERE companyid = "+companyid+"  ORDER BY id DESC"
			}
			con.query(sql, function (err, result) {
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};	
	
	
	this. Memberidref = function (userlevel,userid,companyid, res) {
		connection.acquire(function (err, con) {
			if(userlevel === 'Superadmin')
			{
				var sql = "SELECT `id`,`name` FROM `member_master` ORDER BY id DESC"
			}
			if(userlevel !== 'Superadmin')
			{
				var sql = "SELECT `id`,`name` FROM `member_master` WHERE companyid = "+companyid+"  ORDER BY id DESC"
			}
			con.query(sql, function (err, result) {
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};   
	
	
	
	this. GetMemberDetails = function (memberid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM `member_master` WHERE id ='+memberid, function (err, result) {
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};   
	
	this. DeleteMember = function (memberid, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `member_master` WHERE id ='+memberid, function (err, result) {
				if(err)
				{
					res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
					con.release();
				}
				else
				{
					res.send({status:1,message:'Member`s details deleted successfully',type:'success'})
					con.release();
				}
			});
		});
	};   
	
	/* ------------------------------------MEMBERS DETAILS */
	
	
	/* CHIT DETAILS------------------------------------------- */
	
	this. SaveChit = function (chitdetails, res) {
		connection.acquire(function (err, con) {
			
			con.query('SELECT * FROM `chit_master` WHERE `name` =? AND `companyid` =?',[chitdetails.name,chitdetails.companyid], function (err, result) {
				console.log(err)
				if(err)
				{
					res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
					con.release();
				}
				else
				{
					if(result.length > 0 && !chitdetails.id)
					{
						res.send({status:2,message:'Chit`s details already exist',type:'error'})
					}
					else
					{
						if(chitdetails.id)
						{
							con.query('UPDATE `chit_master` SET ? WHERE id = ?',[chitdetails,chitdetails.id], function (err, result) {
								console.log(err)
								if(err)
								{
									res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
									con.release();
								}
								else
								{
									res.send({status:1,message:'Chit`s details updated successfully',type:'success'})
									con.release();
								}
							})
						}
						
						else
						{
							con.query('INSERT INTO `chit_master` SET ?',chitdetails, function (err, result) {
								console.log(err)
								if(err)
								{
									res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
									con.release();
								}
								else
								{
									res.send({status:1,message:'Chit`s details inserted successfully',type:'success'})
									con.release();
								}
							})
						}
					}
				}
			});
		});
	};   
	
	this. ListChitDetails = function (userlevel,userid,companyid, res) {
		connection.acquire(function (err, con) {
			if(userlevel === 'Superadmin')
			{
				var sql = "SELECT `id`,`name`,`fromdate`,`todate`,`chitamount`,(SELECT companymaster.name FROM companymaster WHERE companymaster.id = chit_master.companyid) as companyname FROM `chit_master` ORDER BY id DESC"
			}
			if(userlevel !== 'Superadmin')
			{
				var sql = "SELECT `id`,`name`,`fromdate`,`todate`,`chitamount` FROM `chit_master` WHERE  chit_master.companyid = "+companyid+"  ORDER BY id DESC"
			}
			con.query(sql, function (err, result) {
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};  


	this. Chitidref = function (userlevel,userid,companyid, res) {
		connection.acquire(function (err, con) {
			if(userlevel === 'Superadmin')
			{
				var sql = "SELECT `id`,`name` FROM `chit_master` ORDER BY id DESC"
			}
			if(userlevel !== 'Superadmin')
			{
				var sql = "SELECT `id`,`name` FROM `chit_master` WHERE  chit_master.companyid = "+companyid+"  ORDER BY id DESC"
			}
			con.query(sql, function (err, result) {
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	}; 	
	
	
	
	this. GetChitDetails = function (chitid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM `chit_master` WHERE id ='+chitid, function (err, result) {
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};   
	
	this. DeleteChit = function (chitid, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `chit_master` WHERE id ='+chitid, function (err, result) {
				if(err)
				{
					res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
					con.release();
				}
				else
				{
					res.send({status:1,message:'Chit`s details deleted successfully',type:'success'})
					con.release();
				}
			});
		});
	};   
	
	/* ------------------------------------CHIT DETAILS */
	
	
	/* CHIT MEBERS DETAILS------------------------------------------- */
	
	this. SaveChitvsMenber = function (chitdetails, res) {
		connection.acquire(function (err, con) {
			delete chitdetails.selectedmemberid;
			delete chitdetails.selectedchitid;
			con.query('SELECT * FROM `chitmembers` WHERE `chitid` =? AND `memberid` =? AND `companyid` =?',[chitdetails.chitid,chitdetails.memberid,chitdetails.companyid], function (err, result) {
				console.log(err)
				if(err)
				{
					res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
					con.release();
				}
				else
				{
					if(result.length > 0 && !chitdetails.id)
					{
						res.send({status:2,message:'Chit details already alocated for this member',type:'error'})
					}
					else
					{
						if(chitdetails.id)
						{
							con.query('UPDATE `chitmembers` SET ? WHERE id = ?',[chitdetails,chitdetails.id], function (err, result) {
								console.log(err)
								if(err)
								{
									res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
									con.release();
								}
								else
								{
									res.send({status:1,message:'Chit allocation details updated successfully',type:'success'})
									con.release();
								}
							})
						}
						
						else
						{
							con.query('INSERT INTO `chitmembers` SET ?',chitdetails, function (err, result) {
								console.log(err)
								if(err)
								{
									res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
									con.release();
								}
								else
								{
									res.send({status:1,message:'Chit allocation details inserted successfully',type:'success'})
									con.release();
								}
							})
						}
					}
				}
			});
		});
	};   
	
	this. ListChitallocationDetails = function (userlevel,userid,companyid, res) {
		connection.acquire(function (err, con) {
			if(userlevel === 'Superadmin')
			{
				var sql = "SELECT `id`,`chitreceiptamt`,`chitreceiptdate`,(SELECT chit_master.name from chit_master WHERE chit_master.id = chitmembers.chitid) as chitname,(SELECT member_master.name FROM member_master WHERE member_master.id =  chitmembers.memberid) as membername,(SELECT companymaster.name FROM companymaster WHERE companymaster.id = chitmembers.companyid) as companyname FROM `chitmembers` ORDER BY id DESC"
			}
			if(userlevel !== 'Superadmin')
			{
				var sql = "SELECT `id`,`chitreceiptamt`,`chitreceiptdate`,(SELECT chit_master.name from chit_master WHERE chit_master.id =  chitmembers.chitid) as chitname,(SELECT member_master.name FROM member_master WHERE member_master.id = chitmembers.memberid) as membername FROM `chitmembers` WHERE chitmembers.companyid =  "+companyid+"  ORDER BY id DESC"
			}
			con.query(sql, function (err, result) {
				console.log(err)
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};  


	this. GetChitallocationDetails = function (chitid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT *,(SELECT member_master.name FROM member_master WHERE member_master.id = chitmembers.memberid) as selectedmemberid,(SELECT chit_master.name FROM chit_master WHERE chit_master.id = chitmembers.chitid) as selectedchitid FROM `chitmembers` WHERE id ='+chitid, function (err, result) {
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};   
	
	this. DeleteChitallocation = function (chitid, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `chitmembers` WHERE id ='+chitid, function (err, result) {
				if(err)
				{
					res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
					con.release();
				}
				else
				{
					res.send({status:1,message:'Chit allocation details deleted successfully',type:'success'})
					con.release();
				}
			});
		});
	};   
	
	/* ------------------------------------CHIT MEMBERS DETAILS */
	
	
	/* CHIT PAYMENT DETAILS------------------------------------------- */
	
	this. SaveChitPayment = function (chitdetails, res) {
		connection.acquire(function (err, con) {
			delete chitdetails.selectedmemberid;
			delete chitdetails.selectedchitid;
			con.query('SELECT * FROM `chitpayments` WHERE `chitid` =? AND `memberid` =? AND `companyid` =?',[chitdetails.chitid,chitdetails.memberid,chitdetails.companyid], function (err, result) {
				console.log(err)
				if(err)
				{
					res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
					con.release();
				}
				else
				{
					if(result.length > 0 && !chitdetails.id)
					{
						res.send({status:2,message:'Chit payment details already allocated for this member',type:'error'})
					}
					else
					{
						if(chitdetails.id)
						{
							con.query('UPDATE `chitpayments` SET ? WHERE id = ?',[chitdetails,chitdetails.id], function (err, result) {
								console.log(err)
								if(err)
								{
									res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
									con.release();
								}
								else
								{
									res.send({status:1,message:'Chit payment details updated successfully',type:'success'})
									con.release();
								}
							})
						}
						
						else
						{
							con.query('INSERT INTO `chitpayments` SET ?',chitdetails, function (err, result) {
								console.log(err)
								if(err)
								{
									res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
									con.release();
								}
								else
								{
									res.send({status:1,message:'Chit payment details inserted successfully',type:'success'})
									con.release();
								}
							})
						}
					}
				}
			});
		});
	};   
	
	this. ListChitPaymentDetails = function (userlevel,userid,companyid, res) {
		connection.acquire(function (err, con) {
			if(userlevel === 'Superadmin')
			{
				var sql = "SELECT *,(SELECT member_master.name FROM member_master WHERE member_master.id = chitpayments.memberid) as membername,(SELECT chit_master.name FROM chit_master WHERE chit_master.id = chitpayments.chitid) as chitname FROM `chitpayments` WHERE chitpayments.companyid = (SELECT companymaster.name FROM companymaster WHERE companymaster.id = chitpayments.companyid) as companyname FROM `chitpayments` ORDER BY id DESC"
			}
			if(userlevel !== 'Superadmin')
			{
				var sql = "SELECT *,(SELECT member_master.name FROM member_master WHERE member_master.id = chitpayments.memberid) as membername,(SELECT chit_master.name FROM chit_master WHERE chit_master.id = chitpayments.chitid) as chitname FROM `chitpayments` WHERE chitpayments.companyid =  "+companyid+"  ORDER BY id DESC"
			}
			con.query(sql, function (err, result) {
				console.log(err)
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};  


	this. GetChitPaymentDetails = function (chitid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT *,(SELECT member_master.name FROM member_master WHERE member_master.id  = chitpayments.memberid) as selectedmemberid,(SELECT chit_master.name FROM chit_master WHERE chit_master.id = chitpayments.chitid) as selectedchitid FROM `chitpayments` WHERE id ='+chitid, function (err, result) {
				console.log(err)
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};   
	
	this. DeleteChitPayment = function (chitid, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `chitpayments` WHERE id ='+chitid, function (err, result) {
				if(err)
				{
					res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
					con.release();
				}
				else
				{
					res.send({status:1,message:'Chit payments details deleted successfully',type:'success'})
					con.release();
				}
			});
		});
	};   
	
	/* ------------------------------------CHIT PAYMENT DETAILS */
	
	
	
	/* CHIT RECEIPT DETAILS------------------------------------------- */
	
	this. SaveChitReceipt = function (chitdetails, res) {
		connection.acquire(function (err, con) {
			delete chitdetails.selectedmemberid;
			delete chitdetails.selectedchitid;
			con.query('SELECT * FROM `chitreciepts` WHERE `chitid` =? AND `memberid` =? AND `companyid` =?',[chitdetails.chitid,chitdetails.memberid,chitdetails.companyid], function (err, result) {
				console.log(err)
				if(err)
				{
					res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
					con.release();
				}
				else
				{
					if(result.length > 0 && !chitdetails.id)
					{
						res.send({status:2,message:'Chit receipt details already allocated for this member',type:'error'})
					}
					else
					{
						if(chitdetails.id)
						{
							con.query('UPDATE `chitreciepts` SET ? WHERE id = ?',[chitdetails,chitdetails.id], function (err, result) {
								console.log(err)
								if(err)
								{
									res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
									con.release();
								}
								else
								{
									res.send({status:1,message:'Chit receipt details updated successfully',type:'success'})
									con.release();
								}
							})
						}
						
						else
						{
							con.query('INSERT INTO `chitreciepts` SET ?',chitdetails, function (err, result) {
								console.log(err)
								if(err)
								{
									res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
									con.release();
								}
								else
								{
									res.send({status:1,message:'Chit receipt details inserted successfully',type:'success'})
									con.release();
								}
							})
						}
					}
				}
			});
		});
	};   
	
	this. ListchitReceiptDetails = function (userlevel,userid,companyid, res) {
		connection.acquire(function (err, con) {
			if(userlevel === 'Superadmin')
			{
				var sql = "SELECT *,(SELECT member_master.name FROM member_master WHERE member_master.id = chitreciepts.memberid) as membername,(SELECT chit_master.name FROM chit_master WHERE chit_master.id = chitreciepts.chitid) as chitname FROM `chitreciepts` WHERE chitreciepts.companyid = (SELECT companymaster.name FROM companymaster WHERE companymaster.id = chitreciepts.companyid) as companyname FROM `chitreciepts` ORDER BY id DESC"
			}
			if(userlevel !== 'Superadmin')
			{
				var sql = "SELECT *,(SELECT member_master.name FROM member_master WHERE member_master.id = chitreciepts.memberid) as membername,(SELECT chit_master.name FROM chit_master WHERE chit_master.id = chitreciepts.chitid) as chitname FROM `chitreciepts` WHERE chitreciepts.companyid =  "+companyid+"  ORDER BY id DESC"
			}
			con.query(sql, function (err, result) {
				console.log(err)
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};  


	this. GetchitReceiptDetails = function (chitid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT *,(SELECT member_master.name FROM member_master WHERE member_master.id  = chitreciepts.memberid) as selectedmemberid,(SELECT chit_master.name FROM chit_master WHERE chit_master.id = chitreciepts.chitid) as selectedchitid FROM `chitreciepts` WHERE id ='+chitid, function (err, result) {
				console.log(err)
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};   
	
	this. DeleteChitReceipt = function (chitid, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `chitreciepts` WHERE id ='+chitid, function (err, result) {
				if(err)
				{
					res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
					con.release();
				}
				else
				{
					res.send({status:1,message:'Chit receipt details deleted successfully',type:'success'})
					con.release();
				}
			});
		});
	};   
	
	/* ------------------------------------CHIT RECEIPT DETAILS */
	
	
	/* PLAN ALLOCATION DETAILS------------------------------------------- */
	
	this. SavePlanAllocation = function (plandetails, res) {
		connection.acquire(function (err, con) {
			
			con.query('SELECT * FROM `planallocation` WHERE DATE_FORMAT(`startingadte`,"%Y-%m-%d") <= DATE_FORMAT("'+plandetails.startingadte+'","%Y-%m-%d") OR DATE_FORMAT(`validity`,"%Y-%m-%d") >= DATE_FORMAT("'+plandetails.validity+'","%Y-%m-%d") AND `companyid` = '+plandetails.companyid, function (err, result) {
				console.log(err)
				if(err)
				{
					res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
					con.release();
				}
				else
				{
					if(result.length > 0 && !plandetails.id)
					{
						res.send({status:2,message:'Plan already allocated for this company',type:'error'})
					}
					else
					{
						if(plandetails.id)
						{
							delete plandetails.reneweddate
							con.query('UPDATE `planallocation` SET ? WHERE id = ?',[plandetails,plandetails.id], function (err, result) {
								console.log(err)
								if(err)
								{
									res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
									con.release();
								}
								else
								{
									res.send({status:1,message:'Plan allocation details updated successfully',type:'success'})
									con.release();
								}
							})
						}
						
						else
						{
							con.query('INSERT INTO `planallocation` SET ?',plandetails, function (err, result) {
								console.log(err)
								if(err)
								{
									res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
									con.release();
								}
								else
								{
									res.send({status:1,message:'Plan allocation details inserted successfully',type:'success'})
									con.release();
								}
							})
						}
					}
				}
			});
		});
	};   
	
	this. ListAllocatedPlans = function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT `id`,`startingadte`,reneweddate,amtpaid,`validity`,(SELECT plans.name FROM plans WHERE plans.id = planallocation.planid) as planname,(SELECT companymaster.name FROM companymaster WHERE companymaster.id = planallocation.companyid) as compnyname FROM `planallocation` ORDER BY id DESC', function (err, result) {
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};   
	
	this. ListPlansreferance = function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT id,name,amount FROM `plans` ORDER BY id desc', function (err, result) {
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};   
	
	this.GetAllocatedPlanDetails = function (planid, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM `planallocation` WHERE id ='+planid, function (err, result) {
				if(err)
				{
					res.send({message:'No data found'});
					con.release();
				}
				else
				{
					res.send(result);
					con.release();
				}
			});
		});
	};   
	
	this.DeleteAllocatedPlan = function (planid, res) {
		connection.acquire(function (err, con) {
			con.query('DELETE FROM `planallocation` WHERE id ='+planid, function (err, result) {
				if(err)
				{
					res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
					con.release();
				}
				else
				{
					res.send({status:1,message:'Plan details deleted successfully',type:'success'})
					con.release();
				}
			});
		});
	};   
	
	this. GetExpDate = function (allocationDetails, res) {
	 connection.acquire(function (err, con) {
			con.query('SELECT (CASE WHEN plans.planinterval = "Years" THEN Date_add(("'+allocationDetails.startingadte+'" - INTERVAL + 1 day),interval + (plans.validity * 12) month) WHEN plans.planinterval = "Months" THEN Date_add(("'+allocationDetails.startingadte+'" - INTERVAL + 1 day),interval + plans.validity month) WHEN plans.planinterval = "Days" THEN Date_add(("'+allocationDetails.startingadte+'" - INTERVAL + 1 day),interval + plans.validity DAY) END) as expdate,plans.amount,CONCAT(plans.validity," ",plans.planinterval) AS planvalidity,plans.description FROM plans WHERE plans.id = '+allocationDetails.planid, function (err, result) {
				if(err)
				{
					res.send({status:0,message:'Something went wrong , Please try again',type:'error'})
					con.release();
				}
				else
				{
					res.send(result)
					con.release();
				}
			});
		}); 
	};   
	
	/* ------------------------------------PLAN ALLOCATION DETAILS */
	
	this. ListState = function (req, res) {
		connection.acquire(function (err, con) {
			con.query('SELECT * FROM `statemaster` ORDER BY id desc', function (err, result) {
				con.release();
				res.send(result);
			});
		});
	};   
	
}
module.exports = new master();