const generate = document.querySelector('#generate');
const result = document.querySelector('#result');

const upper = document.querySelector('#uppercase');
const lower = document.querySelector('#lowercase');
const numbers = document.querySelector('#numbers');
const symbols = document.querySelector('#symbols');
const leng = document.querySelector('#length');
const copy = document.querySelector('#clipboard');
const clear = document.querySelector('.clear');
const list = document.querySelector('.list');

let up = true;
let lo = true;
let num = true;
let sym = true;

const pass=[];


const lowercase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i',
				   'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r',
				   's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

const uppercase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
				   'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
				   'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const symbolList = [
'!','@','#','$','%','^','&','*','=','}','{',')','(', '[' ,']','/', ',' ,'.'
];
// const symbolList = "~`!@#$%^&*()_-+={}[]|\\:;<,>.?/";
const nums = ['0','1','2','3','4','5','6','7','8','9'];

// const all = [];
// all.push(lowercase);
// all.push(uppercase);
// all.push(symbolList);
// all.push(nums);

// console.log(all);
copy.addEventListener('click', function(e) {
	if(!result.innerHTML){
		return;
	}else{
		clipboard(result.innerHTML);
		alert("Password copied to clipboard");
	}
});
function clipboard(text){
	const elem = document.createElement("textarea");
	elem.value = text;
	document.body.appendChild(elem);
	elem.select();
	document.execCommand("copy");
	document.body.removeChild(elem);
}
upper.addEventListener('click', (e) => {
	up = !up;
	// console.log(up);
});

lower.addEventListener('click', (e) => {
	lo = !lo;
	// console.log(lo);
});
numbers.addEventListener('click', (e) => {
	num = !num;
	// console.log(num);
});
symbols.addEventListener('click', (e) => {
	sym = !sym;
	// console.log(sym);
});


generate.addEventListener('click', generateRandomPassword);


function generateRandomPassword(){
	len = leng.value;
	let dem = 0
	if(up) dem++;
	if(lo) dem++;
	if(num) dem++;
	if(sym) dem++;
	// console.log(dem);
	if(len<dem){
		alert("number of criteria is bigger than password's length")
		return;
	}
	if(len<=0 || len >= 201){
		alert("Password's length need to be positive and smaller than 200");
	}else if(!(up||lo||num||sym)){
		alert("Password need to have at least a criteria");
	}else if(len >= 30){
		alert("Because the password's length is too big so it will automatically copy to clipboard");
		clipboard(RandomPassword(len));
	}
	else{
		result.innerHTML = RandomPassword(len);
	}
	const items = getLS();
	list.innerHTML = items.map((item) => {
		return `<li>${item}</li>`
	});
	// console.log(items)
	
}

function randP(l, r){
	return Math.floor(Math.random() * (r-l));
}

function RandomPassword(len){
	const all = [];
	if(up) all.push(uppercase);
	if(lo) all.push(lowercase);
	if(num) all.push(nums);
	if(sym) all.push(symbolList);
	
	// console.log(len)
	const str = [];
	while(len>0){
		if(len==all.length){
			for(let i=0;i<all.length;i++){
				str.unshift(all[i][randP(0,all[i].length)]);
			}
			len = 0;
		}else{
			let k = randP(0,all.length);
			// console.log(k);
			str.push(all[k][randP(0,all[k].length)]);
		}

		len--;
	}
	addLS(str.join(""));
	// console.log(str.join(""));
	return str.join("");
	// console.log(str.join(''));
}

function getLS(){
	return sessionStorage.getItem("list")?JSON.parse(sessionStorage.getItem("list")):[];
}
function addLS(value){
	const items = getLS();
	items.push(value);
	// console.log(sessionStorage.getItem("list"));
	sessionStorage.setItem("list", JSON.stringify(items));
	// console.log(sessionStorage.getItem("list"));
}

clear.addEventListener('click', function(e) {
	sessionStorage.clear();
	list.innerHTML = '';
});
