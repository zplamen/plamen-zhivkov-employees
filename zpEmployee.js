class Employee{
  constructor(empID, projectID, dateFromStr, dateToStr){
     this.employeeID = empID;
	 this.projectID = projectID;
	 
	 this.dateFrom = new Date(dateFromStr);
	 
	 if(dateToStr.toUpperCase() == "NULL"){
		 this.dateTo = new Date( new Date().toDateString());
	 }else{
		this.dateTo = new Date(dateToStr); 
	 }
  }
}

const oneDay = 1000 * 24 * 60 * 60;
class EmployeeCouple{
  constructor(emp1ID, emp2ID, projectID, dateFrom, dateTo){
     this.employee1ID = emp1ID;
	 this.employee2ID = emp2ID;
	 this.projectID = projectID;
	 this.dateFrom = dateFrom;
	 this.dateTo = dateTo;
	 this.daysWorked = Math.round((dateTo.getTime() - dateFrom.getTime()) / oneDay );
  }
  
}

var Employees = [];
var EmployeeCouples = [];
var data = "";

//var fileList = event.target.files;
//const fr = new FileReader();
//fr.onload = ()=>{
//	data = fr.result;
//}
//fr.readAsText('./FirstName-LastName-employees.txt');
//const fileURL = './FirstName-LastName-employees.txt';

  
function populateEmployees(data){
	let allRows = data.split(/\r?\n|\r/);
	
	for(let rowData of allRows){
		let emp = [];
		emp = rowData.split(",");
		//console.log("Employee params: %s %s %s %s" ,emp[0],emp[1],emp[2],emp[3]);
		if(emp.length == 4 && isNaN( Date.parse(emp[2])) == false ){
		   EmployeeObj = new Employee(emp[0].trim(),emp[1].trim(),emp[2].trim(),emp[3].trim());
		   Employees.push(EmployeeObj);
           //console.log("add Employee: %s " ,JSON.stringify(Employees[Employees.length - 1]));
		}
	}
}

function populateEmployeeCouples(){ 
    console.log("Invoked populateEmployeeCouples function");
	Employees.sort((emp1,emp2)=>{
		return ((emp1.projectID < emp2.projectID) ||
		        ((emp1.projectID == emp2.projectID) && 
				 ((emp1.dateFrom +0) < (emp2.dateFrom+0))))? -1: 1;
		   
	    });
	Employees.forEach((EmpValue, index, EmpArr)=>{
		//console.log(" EmpValue:" + JSON.stringify(EmpValue));
		for( let i=index+1; i < EmpArr.length; i++){
			
			if(EmpValue.projectID == EmpArr[i].projectID &&
			   EmpValue.dateFrom.valueOf() <= EmpArr[i].dateTo.valueOf() &&
			   EmpValue.dateTo.valueOf() >= EmpArr[i].dateFrom.valueOf() &&
			   EmpValue.employeeID != EmpArr[i].employeeID
			) {
				console.log(" EmpValue:" + JSON.stringify(EmpValue));
				console.log(" EmpArr %i %s:", i, JSON.stringify(EmpArr[i]));
				
				EmployeeCouples.push(
				   new EmployeeCouple(EmpValue.employeeID,
				                      EmpArr[i].employeeID,
									  EmpValue.projectID,
									  ((EmpArr[i].dateFrom.valueOf()>EmpValue.dateFrom.valueOf()
									    )? EmpArr[i].dateFrom : EmpValue.dateFrom),
									  ((EmpArr[i].dateTo.valueOf()<EmpValue.dateTo.valueOf()
									    )? EmpArr[i].dateTo : EmpValue.dateTo)	
									  )
				);
				console.log("new EmployeeCouples: %s",JSON.stringify(EmployeeCouples[EmployeeCouples.length-1]));
			}
		}
	});
	
	
	EmployeeCouples.sort((a,b)=>{
		return b.daysWorked - a.daysWorked;
	});
}