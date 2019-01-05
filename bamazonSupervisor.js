var inquirer = require('inquirer');
var mysql = require('mysql');
var table = require('console.table'); 
var values = []; 
var departmentArr = []; 

var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'sqluser',
  password: 'password',
  database: 'bamazon'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId); 
  supervise()
});

function supervise () {
	// promptManagerAction
	// connection.query("SELECT * FROM departments", function(err, res) { 
		// console.log(res)
		inquirer.prompt([
			{
				type: "list", 
				name: "actions",
				message: "What would you like to do?",
				choices: ["View Sales by Departments", "Create New Departments"]
			}
		]).then(function(response) {
			if (response.actions === "View Sales by Departments") {
				viewDepartments()
			} else if (response.actions === "Create New Departments") {
				addDepartment()
			}
		});
	// });
}

function viewDepartments () {
	connection.query("SELECT department_id, department_name,  over_head_costs, b.product_sales, (over_head_costs-b.product_sales) as total_profit FROM bamazon.departments a LEFT JOIN (SELECT DEPARTMENT_NAME as dept_name, SUM(PRODUCT_SALES) AS product_sales from bamazon.products group by department_name) b on a.department_name= b.dept_name;", function(err, res) {		
		if (err) throw err; 
		// console.log(res)
		values = []
		for (var i = 0 ; i < res.length ; i++) {
			var profit = res[i].total_sales - res[i].over_head_costs
			values.push([res[i].department_id, res[i].department_name, "$" + res[i].total_sales, "$" + res[i].over_head_costs, "$" + profit])
		};
		// console.log(values)
		console.table(['Department ID','Department Name','Sales','Over Head Costs', 'PnL'], values);
		supervise()

	});
}







// function continueSupervise () {
// 	inquirer.prompt([
// 		{
// 			type: "list",
// 			name: "repeat", 
// 			message: "Will you like to do something else?", 
// 			choices: ["YES", "NO"]
// 		}
// 	]).then(function(response) {
// 		if (response.repeat === "NO") {
// 			console.log("Exit Executive System.")
// 			connection.end()
// 		}
// 		else { 
// 			supervise()
// 		}
// 	});
// };


function addDepartment () {
	connection.query("SELECT * FROM departments", function (err, res) { 
		if (err) throw err; 
		departmentArr = [];
		for (var i = 0; i < res.length; i++) {
			departmentArr.push(res[i].department_name)
		}; 
		inquirer.prompt([
			{
				type:"input",
				name:"departmentName",
				message:"What is the name of this new department?"
			},
			{
				type: "input",
				name: "overHead", 
				message: "What is the over head costs of this department?", 
				validate: function (value) { 
					if (isNaN(value) === false) {
						return true 
					} 
					else {
						return false 
					}
				}
			}
		]).then(function(response) {
			if (departmentArr.indexOf(response.departmentName) < 0) {
				connection.query('INSERT INTO departments SET ?', {department_name: response.departmentName, over_head_costs: response.overHead}, function (error, results, fields) {
		  			if (error) throw error;
		  			console.log(response.departmentName + " has been added with department_id of " + results.insertId)
		  			supervise()
				});
			}
			else {
				console.log("This department already exist. The Board of Directors does not approve duplicates.")
				supervise()
			}
		});
	});
}

