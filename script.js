


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

async function SelectionSort() {
	let delay = Disable_The_Input();

	let container = document.getElementById("container");
	for (let i = 0; i < bars.length; i++) {
		let mn_ind = i;
		let curr_id = bars[i].split('id="')[1].split('"')[0];
		document.getElementById(curr_id).style.backgroundColor = selected;
		let sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
		beep(100, sound, delay)
		for (let j = i + 1; j < bars.length; j++) {
			let nxt_ele = bars[j].split('id="')[1].split('"')[0];
			document.getElementById(nxt_ele).style.backgroundColor = chng;
			let a = parseInt(bars[mn_ind].split(/[:%]/)[1]);
			let b = parseInt(bars[j].split(/[:%]/)[1]);
			if (a > b) mn_ind = j;
			await Sleep(delay / 5.0);
			document.getElementById(nxt_ele).style.backgroundColor = def;
		}

		let nxt_ele = bars[mn_ind].split('id="')[1].split('"')[0];
		document.getElementById(nxt_ele).style.backgroundColor = selected;
		await Sleep(2 * delay / 5.0);

		let tmp = bars[mn_ind];
		bars[mn_ind] = bars[i];
		bars[i] = tmp;

		container.innerHTML = bars.join('');
		await Sleep(2 * delay / 5.0);
		document.getElementById(curr_id).style.backgroundColor = def;
		document.getElementById(nxt_ele).style.backgroundColor = def;
	}
	Finished_Sorting();
}

//2).
async function BubbleSort() {
	let delay = Disable_The_Input();
	let container = document.getElementById("container");

	for (let i = 0; i < bars.length - 1; i++) {
		let has_swap = false;
		for (let j = 0; j < bars.length - i - 1; j++) {
			let curr_id = bars[j].split('id="')[1].split('"')[0];
			let nxt_ele = bars[j + 1].split('id="')[1].split('"')[0];

			document.getElementById(curr_id).style.backgroundColor = selected;
			let sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
			beep(100, sound, delay)
			document.getElementById(nxt_ele).style.backgroundColor = chng;
			await Sleep(delay / 2);
			let a = parseInt(bars[j].split(/[:%]/)[1]);
			let b = parseInt(bars[j + 1].split(/[:%]/)[1]);
			if (a > b) {
				has_swap = true;

				let t = bars[j];
				bars[j] = bars[j + 1];
				bars[j + 1] = t;

				container.innerHTML = bars.join('');
			}
			document.getElementById(curr_id).style.backgroundColor = selected;
			document.getElementById(nxt_ele).style.backgroundColor = chng;
			await Sleep(delay / 2.0);
			document.getElementById(curr_id).style.backgroundColor = def;
			document.getElementById(nxt_ele).style.backgroundColor = def;
		}
		if (has_swap == false) break;
	}
	Finished_Sorting();
}

//3rd
async function InsertionSort() {
	let delay = Disable_The_Input();
	let container = document.getElementById("container");
	for (let i = 1; i < bars.length; i++) {
		let j = i - 1;
		let key = bars[i];
		let curr_id = key.split('id="')[1].split('"')[0];
		let nxt_ele = bars[j].split('id="')[1].split('"')[0];
		document.getElementById(curr_id).style.backgroundColor = selected;
		let sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
		beep(100, sound, delay)
		while (j >= 0 && parseInt(bars[j].split(/[:%]/)[1]) > parseInt(key.split(/[:%]/)[1])) {
			document.getElementById(nxt_ele).style.backgroundColor = def;
			nxt_ele = bars[j].split('id="')[1].split('"')[0];
			document.getElementById(nxt_ele).style.backgroundColor = chng;
			await Sleep(delay);
			bars[j + 1] = bars[j];
			j--;
		}

		bars[j + 1] = key;
		container.innerHTML = bars.join('');
		document.getElementById(curr_id).style.backgroundColor = selected;
		document.getElementById(nxt_ele).style.backgroundColor = chng;
		await Sleep(delay * 3.0 / 5);
		document.getElementById(curr_id).style.backgroundColor = def;
		document.getElementById(nxt_ele).style.backgroundColor = def;
	}
	Finished_Sorting();
}
//4th
function Slide_down(l, r) {
	let temp = bars[r];
	for (let i = r - 1; i >= l; i--) {
		bars[i + 1] = bars[i];
	}
	bars[l] = temp;
}


async function merge(l, m, r, d) {
	let y = l;
	let i = l;
	let j = m + 1;

	while (i < j && j <= r) {
		let curr_id = bars[j].split('id="')[1].split('"')[0];
		let nxt_ele = bars[i].split('id="')[1].split('"')[0];
		document.getElementById(curr_id).style.backgroundColor = selected;
		document.getElementById(nxt_ele).style.backgroundColor = chng;
		let a = parseInt(bars[j].split(/[:%]/)[1]);
		let b = parseInt(bars[i].split(/[:%]/)[1]);

		if (a > b) i++;
		else {
			Slide_down(i, j);
			i++; j++;
		}
		await Sleep(d / 2.0);
		container.innerHTML = bars.join('');
		document.getElementById(curr_id).style.backgroundColor = selected;
		document.getElementById(nxt_ele).style.backgroundColor = chng;
		let sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
		beep(100, sound, d)
		await Sleep(d / 2.0);
		document.getElementById(curr_id).style.backgroundColor = def;
		document.getElementById(nxt_ele).style.backgroundColor = def;
		sound = MapRange(document.getElementById(curr_id).style.height.split('%')[0], 2, 100, 500, 1000);
		beep(100, sound, d)
	}
}


async function mergeSort(l, r, d) {
	if (l < r) {
		let m = parseInt(l + (r - l) / 2);
		await mergeSort(l, m, d);
		await mergeSort(m + 1, r, d);
		await merge(l, m, r, d);
	}
}



async function MergeSort() {
	let delay = Disable_The_Input();
	await mergeSort(0, bars.length - 1, delay);
	Finished_Sorting();
}



