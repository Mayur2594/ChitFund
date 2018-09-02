var  master = require('./models/master');
module.exports = {
    configure: function (app) {
        app.post('/api/user/auth/', function (req, res) {
            master.authUser(req.body, res);
        });
		
		app.get('/api/getDashboardCountSuperadmin/:passinterval/:interval', function (req, res) {
            master.getDashboardCountSuperadmin(req.params.passinterval,req.params.interval, res);
        });
		
		app.get('/api/getDashboardCountAdmin/:passinterval/:interval/:companyid/:userid/:userlevel', function (req, res) {
            master.getDashboardCountAdmin(req.params.passinterval,req.params.interval,req.params.companyid,req.params.userid,req.params.userlevel, res);
        });
		
		/* COMPANY DETAILS------------------------------ */
		
		app.post('/api/SaveCompany/', function (req, res) {
            master.SaveCompany(req.body, res);
        });
        app.get('/api/ListCompanies/', function (req, res) {
            master.ListCompanies(req, res);
        });
		
		app.get('/api/ListCompaniesreferance/', function (req, res) {
            master.ListCompaniesreferance(req, res);
        });
		
		app.get('/api/GetCompanyDetails/:companyid', function (req, res) {
            master.GetCompanyDetails(req.params.companyid, res);
        });
		
		app.delete('/api/DeleteCompany/:companyid', function (req, res) {
            master.DeleteCompany(req.params.companyid, res);
        });
		
		/* ------------------------------COMPANY DETAILS */
		
		/* PLANS DETAILS------------------------------ */
		
		app.post('/api/SavePlan/', function (req, res) {
            master.SavePlan(req.body, res);
        });
        app.get('/api/ListPlans/', function (req, res) {
            master.ListPlans(req, res);
        });
		
		app.get('/api/ListPlansreferance/', function (req, res) {
            master.ListPlansreferance(req, res);
        });
		
		app.get('/api/GetPlanDetails/:planid', function (req, res) {
            master.GetPlanDetails(req.params.planid, res);
        });
		
		app.delete('/api/DeletePlan/:planid', function (req, res) {
            master.DeletePlan(req.params.planid, res);
        });
		
		/* ------------------------------PLANS DETAILS */
		
		/* USERS DETAILS------------------------------ */
		
		app.post('/api/SaveUser/', function (req, res) {
            master.SaveUser(req.body, res);
        });
        app.get('/api/ListUsers/:userlevel/:userid/:companyid', function (req, res) {
            master.ListUsers(req.params.userlevel,req.params.userid,req.params.companyid, res);
        });
		
		
		app.get('/api/GetUserDetails/:userid', function (req, res) {
            master.GetUserDetails(req.params.userid, res);
        });
		
		app.delete('/api/DeleteUser/:userid', function (req, res) {
            master.DeleteUser(req.params.userid, res);
        });
		
		/* ------------------------------UERS DETAILS */
		
		/* MEMBERS DETAILS------------------------------ */
		
		app.post('/api/SaveMember/', function (req, res) {
            master.SaveMember(req.body, res);
        });
        app.get('/api/ListMembers/:userlevel/:userid/:companyid', function (req, res) {
            master.ListMembers(req.params.userlevel,req.params.userid,req.params.companyid, res);
        }); 
		app.get('/api/Memberidref/:userlevel/:userid/:companyid', function (req, res) {
            master.Memberidref(req.params.userlevel,req.params.userid,req.params.companyid, res);
        });

		
		app.get('/api/GetMemberDetails/:memberid', function (req, res) {
            master.GetMemberDetails(req.params.memberid, res);
        });
		
		app.delete('/api/DeleteMember/:memberid', function (req, res) {
            master.DeleteMember(req.params.memberid, res);
        });
		
		/* ------------------------------MEMBERS DETAILS */
		
		/* CHIT DETAILS------------------------------ */
		
		app.post('/api/SaveChit/', function (req, res) {
            master.SaveChit(req.body, res);
        });
        app.get('/api/ListChitDetails/:userlevel/:userid/:companyid', function (req, res) {
            master.ListChitDetails(req.params.userlevel,req.params.userid,req.params.companyid, res);
        }); 
		app.get('/api/Chitidref/:userlevel/:userid/:companyid', function (req, res) {
            master.Chitidref(req.params.userlevel,req.params.userid,req.params.companyid, res);
        });
		
		app.get('/api/GetChitDetails/:chitid', function (req, res) {
            master.GetChitDetails(req.params.chitid, res);
        });
		
		app.delete('/api/DeleteChit/:chitid', function (req, res) {
            master.DeleteChit(req.params.chitid, res);
        });
		
		/* ------------------------------CHIT DETAILS */

		/* CHIT MEBERS DETAILS------------------------------ */
		
		app.post('/api/SaveChitvsMenber/', function (req, res) {
            master.SaveChitvsMenber(req.body, res);
        });
        app.get('/api/ListChitallocationDetails/:userlevel/:userid/:companyid', function (req, res) {
            master.ListChitallocationDetails(req.params.userlevel,req.params.userid,req.params.companyid, res);
        }); 
		
		app.get('/api/GetChitallocationDetails/:chitid', function (req, res) {
            master.GetChitallocationDetails(req.params.chitid, res);
        });
		
		app.delete('/api/DeleteChitallocation/:chitid', function (req, res) {
            master.DeleteChitallocation(req.params.chitid, res);
        });
		
		/* ------------------------------CHIT MEMBERS DETAILS */
		
		/* CHIT PAYMENT DETAILS------------------------------ */
		
		app.post('/api/SaveChitPayment/', function (req, res) {
            master.SaveChitPayment(req.body, res);
        });
        app.get('/api/ListChitPaymentDetails/:userlevel/:userid/:companyid', function (req, res) {
            master.ListChitPaymentDetails(req.params.userlevel,req.params.userid,req.params.companyid, res);
        }); 
		
		app.get('/api/GetChitPaymentDetails/:chitid', function (req, res) {
            master.GetChitPaymentDetails(req.params.chitid, res);
        });
		
		app.delete('/api/DeleteChitPayment/:chitid', function (req, res) {
            master.DeleteChitPayment(req.params.chitid, res);
        });
		
		/* ------------------------------CHIT PAYMENT DETAILS */
		
		/* CHIT RECEIPT DETAILS------------------------------ */
		
		app.post('/api/SaveChitReceipt/', function (req, res) {
            master.SaveChitReceipt(req.body, res);
        });
        app.get('/api/ListchitReceiptDetails/:userlevel/:userid/:companyid', function (req, res) {
            master.ListchitReceiptDetails(req.params.userlevel,req.params.userid,req.params.companyid, res);
        }); 
		
		app.get('/api/GetchitReceiptDetails/:chitid', function (req, res) {
            master.GetchitReceiptDetails(req.params.chitid, res);
        });
		
		app.delete('/api/DeleteChitReceipt/:chitid', function (req, res) {
            master.DeleteChitReceipt(req.params.chitid, res);
        });
		
		/* ------------------------------CHIT RECEIPT DETAILS */
		
		
		/* PLANS ALLOCATION DETAILS------------------------------ */
		
		app.post('/api/GetExpDate/', function (req, res) {
            master.GetExpDate(req.body, res);
        });
		app.post('/api/SavePlanAllocation/', function (req, res) {
            master.SavePlanAllocation(req.body, res);
        });
        app.get('/api/ListAllocatedPlans/', function (req, res) {
            master.ListAllocatedPlans(req, res);
        });
		

		app.get('/api/GetAllocatedPlanDetails/:planid', function (req, res) {
            master.GetAllocatedPlanDetails(req.params.planid, res);
        });
		
		app.delete('/api/DeleteAllocatedPlan/:planid', function (req, res) {
            master.DeleteAllocatedPlan(req.params.planid, res);
        });
		
		/* ------------------------------PLANS ALLOCATION DETAILS */
		
		app.get('/api/SendNotification/', function (req, res) {
            master.SendNotification(req, res);
        });
		app.delete('/api/DeleteArea/:areaid', function (req, res) {
			 master.DeleteArea(req.params.areaid,res);
        }); 	
    }
};