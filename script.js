


function reset() {
	location.reload();
}


function Disable_The_Input() {
	let x = document.getElementsByTagName("input");
	for (let i = 0; i < x.length; i++)
		x[i].disabled = true;
	return parseInt(document.getElementById("delay").value);
}



function Finished_Sorting() {
	let x = document.getElementsByClassName("bar");
	for (let i = 0; i < x.length; i++)
		x[i].style.backgroundColor = finished;
	x = document.getElementsByTagName("input");
	for (let i = 0; i < x.length; i++)
		x[i].disabled = false;

}

function Sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}
