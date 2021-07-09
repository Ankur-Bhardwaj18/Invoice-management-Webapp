let c = 1;
function tobechange(obj) {
	var t = obj.parentNode.parentNode;
	if(obj.checked){
		t.style.background =  '#2A5368' ;
		c++;
	}
	else{
		t.style.background =  "" ;
	}
//	t.style.background = (obj.checked) ? '#2A5368' : "";
}

function toggle(source) {
	toselect = document.getElementsByName("foo");
	for (let i = 0; i < toselect.length; i++) {
		toselect[i].checked = source.checked;
		tobechange(toselect[i])
	}
}
function AddModal(){
  document.getElementById("add_Modal").style.display="block"; 
}
function AddcloseModal(){
  document.getElementById("add_Modal").style.display="none"; 
}
function EditModal(){
  document.getElementById("edit_Modal").style.display="block"; 
}
function EditcloseModal(){
  document.getElementById("edit_Modal").style.display="none"; 
}
function DeleteModal(){
  document.getElementById("delete_Modal").style.display="block"; 
}
function DeletecloseModal(){
  document.getElementById("delete_Modal").style.display="none"; 
}

document.addEventListener('DOMContentLoaded',function(){
	populateTable(0,20);
})

const colorChangeLeft = document.querySelector('#prev_page');
const colorChangeRight = document.querySelector('#next_page');


const right = document.querySelector('#next_page');
right.addEventListener('click', function() {
	console.log("clicked Right")
	nextNav();
})

const left = document.querySelector('#prev_page');
left.addEventListener('click', function() {
	console.log("clicked Right")
	prevNav();
})



let pageNumber = 1;

function populateTable(start,limit)
{
	const xhttp = new XMLHttpRequest();
	xhttp.open("Get","http://localhost:8080//H2HBABBA1115//getinvoiceData.do?start="+start+"&limit="+limit,false);
	xhttp.send();
	
	var data = JSON.parse(xhttp.responseText);
	console.log(data);
	console.log("Entering")
	const tableb = document.getElementById('tablebody');
	let html = '';
	for(let d = 0; d < 20; d++)
	{
		name = "id"+d;
		html += `<tr>
					<td><input type="checkbox" name="foo" onclick="tobechange(this);"></td>
					<td>${data[d].name_customer}</td>
					<td>${data[d].cust_number}</td>
					<td>${data[d].invoice_id}</td>
					<td>${'Rs. '+data[d].total_open_amount}</td>
					<td>${data[d].due_in_date}</td>
					<td>${data[d].clear_date}</td>
					<td>${data[d].notes}</td>
				</tr>`
		tableb.innerHTML = html;
	}
}
		
		
function prevNav(){
	if(pageNumber >= 2){
		pageNumber--;
	}
	if(pageNumber == 1)
		colorChangeLeft.style.color = "black";
	populateTable((pageNumber-1)*20, 20)
}
		
		
function nextNav(){
	pageNumber++;
	if(pageNumber >= 2){
		colorChangeLeft.style.color = "#14AFF1";
	}
	if(pageNumber == 37)
		colorChangeRight.style.color = "black";
	populateTable((pageNumber-1)*20, 20)
}

function createRecord() {
	const customerName = document.getElementById("customerName").value;
	const customerNO = document.getElementById("customerNO").value;
	const invoiceNO = document.getElementById("invoiceNO").value;
	const invoiceAmount = document.getElementById("invoiceAmount").value;
	const dueDate = document.getElementById("dueDate").value;
	const addNotes = document.getElementById("add-notes").value;

	var data = `name_customer=${customerName}&cust_number=${customerNO}&invoice_id=${invoiceNO}&total_open_amount=${invoiceAmount}&due_in_date=${dueDate}&notes=${addNotes}`;

	var xhr = new XMLHttpRequest();
//	xhr.withCredentials = true;
//
//	xhr.addEventListener("readystatechange", function () {
//		if (this.readyState === 4) {
//			console.log(this.responseText);
//		}
//	});

	xhr.open("POST", "http://localhost:8080/H2HBABBA1115/invoiceServlets");
//	xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	xhr.send(data);
	
closeModal();
}