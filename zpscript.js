let loadEmployee = document.createElement('script');
let path =  location.origin + location.pathname;
//console.log(path);
loadEmployee.src = path.substr(0,path.lastIndexOf('/')+1) + '/zpEmployee.js';
document.head.appendChild(loadEmployee);

let input = document.querySelector('input');
 

// It will be triggered when a file is chosen. 
input.addEventListener('change', () => { 
    let files = input.files; 
  
    if (files.length == 0) return; 
    
    const file = files[0]; 
  
    let reader = new FileReader(); 
  
    reader.onload = (e) => { 
        const file = e.target.result; 
       /** Checks the file header row to contain
        *  valid column headers : EmpID, ProjectID, DateFrom, DateTo
        *  Returns if not 
		*/
		console.log(file.search(/EmpID[, ]+ProjectID[, ]+DateFrom[, ]+DateTo/gi));
		if(file.search(/EmpID[, ]+ProjectID[, ]+DateFrom[, ]+DateTo/gi)<0){
			console.log("File column's headers must be: EmpID, ProjectID, DateFrom, DateTo ");
			window.alert("File column's headers must be: EmpID, ProjectID, DateFrom, DateTo ");
			return;
		}	
        populateEmployees(file);
		populateEmployeeCouples();

        const lines = file.split(/\r\n|\n/); 
	
		let divHolder = document.querySelector('#dataGrid') ;

        const table = document.createElement('table');
		const headerRow = ["Employee ID #1", "Employee ID #2", "Project ID", "Days worked"];
        const columnsCount = 4;
		row = table.insertRow(-1);
		table.border = 1;
		
		//Insert table header row
		headerRow.forEach((textHeader)=>{
			const thTag = document.createElement("th");
			thTag.innerHTML = textHeader;
			row.appendChild(thTag);
		});
		//Insert rowDataGrid
		EmployeeCouples.forEach((EmpElement)=>{
			let row = table.insertRow(-1);
			tdArr = [EmpElement.employee1ID,
			         EmpElement.employee2ID,
				     EmpElement.projectID,
					 EmpElement.daysWorked];
			for(let i=0; i<columnsCount; i++){
			   let tdTag =row.insertCell(-1);
			   tdTag.innerHTML =  tdArr[i];
			   tdTag.style.textAlign = 'center';
			}
		});
        divHolder.appendChild(table);
		
  
    }; 
  
    reader.onerror = (e) => alert(e.target.error.name); 
  
    reader.readAsText(file); 
}); 
