/*-----------------------------------------------------------------------------------
Lori Oliver - Revature

This section will focus on Javascript's ability to manipulate the DOM.
Use the provided index.html
-----------------------------------------------------------------------------------

1. USA
Define function getUSA()
Find the html element that contains "USA".
Print that element's contents.
*/
function getUSA(event) {
	let usa = document.querySelector("span[data-customAttr='USA']");
	console.log(usa);
}

/* 
2. Sales
Define function getPeopleInSales()
Print the names of all the people in the sales department.
*/
function getPeopleInSales() {
	let allElements = document.getElementsByTagName('td');
	let allNames = [];
	let allDept = [];

	for (let item of allElements) {
		if (item.classList.contains('empName')) {
			allNames.push(item.innerText);
		} else {
			allDept.push(item.innerText);
		}
		// console.log('Item: ', item.innerText);
	}

	let allSales = [];
	let count = 0;
	for (let index = 0; index < allNames.length; index++) {
		if (allDept[index] === "Sales") {
			allSales[count++] = allNames[index];
		}
	}
	console.log('All Sales Employees:\n', allSales);
}
getPeopleInSales()

/*
3. Click Here
Define function getAnchorChildren()
Find all anchor elements with a <span> child.
Print the contents of <span>*/
function getAnchorChildren() {
	let aSpan = document.querySelectorAll('a > span');

	for (let i = 0; i < aSpan.length; i++) {
		console.log(aSpan[i].innerHTML);
	}

}
getAnchorChildren();
/*
4. Hobbies
Define function getHobbies()
Find all checked options in the 'skills' select element.
Print the value and the contents.*/
function getHobbies() {
	let skills = document.querySelector('[name="skills"]');
	//console.log('Skills: ', skills);
	let options = skills.getElementsByTagName('option');
	for (let opt of options) {
		if (opt.getAttribute('selected') === 'selected') {
			console.log('Val: ', opt.getAttribute('value'));
			console.log('Contents: ', opt.innerText);
		}
	}
}
getHobbies();
/*
5. Custom Attribute
Define function getCustomAttribute()
Find all elements with "data-customAttr" attribute
Print the value of the attribute.
Print the element that has the attribute.*/
function getCustomAttribute() {
	let custom = document.querySelectorAll("[data-customAttr]");
	for (const item of custom) {
		console.log('Value: ', item.getAttribute('data-customAttr'));
		console.log('Element: ', item);
	}
}
getCustomAttribute();
/*
6. Sum Event
NOTE: Write unobtrusive Javascript
Regarding these elements:
	<input id="num1" class="nums" type="text"/>
	<input id="num2" class="nums" type="text"/>
	<h3>Sum: <span id="sum"></span></h3>

Define onchange event handler.
Add <input> element values.
Put the sum in the <span> element.
If values cannot be added, put "Cannot add" in the <span> element*/
function calcSum() {
	let num1 = Number(document.getElementById("num1").value);
	let num2 = Number(document.getElementById("num2").value);
	let sumElement = document.getElementById("sum");
	let sum = 0;
	let validNumber = false;

	if ((typeof num1 === typeof 1) && (typeof num2 === typeof 1)) {
		// NaN and 0 will still get through
		if (num1 && num2) {
			// 0 can't get through
			sum += num1 + num2;
			validNumber = true;
		} else {
			if (num1 !== NaN) {
				if (num2 !== NaN) {
					sum += num1 + num2;
					validNumber = true;
				}
			}
		}
	}
	validNumber
		? sumElement.innerText = sum
		: sumElement.innerText = "Can't Add!";
}


/*
7. Skills Event
NOTE: Write unobtrusive Javascript
When user selects a skill, create an alert with a message similar to:
	"Are you sure CSS is one of your skills?"
NOTE: no alert should appear when user deselects a skill. */
/* function skilled() {
	let skills = document.querySelector('[name="skills"]');
	for (const skill of skills) {
		let skillName = skill.value;
		skillName.addEventListener('change', (ev) => {
			let resp = prompt(`Are you sure ${skillName} is one of your skills?`);
			if (ans === null || ans.toLowerCase() === 'no') {
				select[i].value = id;
			}
		});
	} */
(function () {
	const select = document.getElementsByTagName('select');
	for (let i = 0; i < select.length; i++) {
		if (select[i].getAttribute('name', 'skills')) {
			let id = select[i].value;
			select[i].addEventListener('change', e => {
				let ans = prompt(`Are you sure ${select[i].value} is one of your skills? (yes or no)`);
				console.log(ans);
				if (ans === null || ans.toLowerCase() === 'no') {
					select[i].value = id;
				}
			});
		}
	}
})();

/*
8. Favorite Color Event
NOTE: Write unobtrusive Javascript
NOTE: This is regarding the favoriteColor radio buttons.
When a user selects a color, create an alert with a message similar to:
	"So you like green more than blue now?"
In this example, green is the new value and blue is the old value.
Make the background color (of all favoriteColor radio buttons) the newly selected favoriteColor*/
(function () {
	const favColors = document.querySelectorAll('form#firstForm input[name="favoriteColor"]');
	let last = null, current = null;
	for (let i = 0; i < favColors.length; i++) {
		favColors[i].addEventListener('change', (e) => {
			current = favColors[i];
			if (last === null) {
				last = current;
			} else {
				if (current != last) {
					let a = current.getAttribute('value');
					let b = last.getAttribute('value');
					alert(`So you like ${a} more than ${b} now.`);
					last = current;
				}
			}
			document.body.style.backgroundColor = current.getAttribute('value');
		});
	}
})();

/*9. Show/Hide Event
NOTE: Write unobtrusive Javascript
When user hovers over an employees name:
	Hide the name if shown.
	Show the name if hidden.*/
(function () {
	const td = document.querySelectorAll('[class="empName"]');
	for (let i = 0; i < td.length; i++) {
		let style = getComputedStyle(td[i]);
		let last = style.opacity;
		td[i].addEventListener('mouseover', (e) => {
			let isVis = style.opacity === last;
			td[i].style.opacity = (isVis ? '0' : last);
		});
	}
})();

/*10. Current Time
Regarding this element:
	<h5 id="currentTime"></h5>
Show the current time in this element in this format: 9:05:23 AM
The time should be accurate to the second without having to reload the page.*/
(function () {
	window.addEventListener('load', (e) => {
		function PrintTime() {
			let h5 = document.getElementById('currentTime');
			function UpdateTime() {
				h5.innerHTML = new Date().toLocaleTimeString();
				let id = setTimeout(UpdateTime, 1000);
			}
			return UpdateTime();
		}
		PrintTime();
	});
})();

/*11. Delay
Regarding this element:
	<p id="helloWorld">Hello, World!</p>
Three seconds after a user clicks on this element, change the text to a random color.*/
(function () {
	function RandRange(min, max) {
		return Math.round((min + (max - min) * Math.random())).toString();
	}
	function RandColor() {
		let r = RandRange(0, 255);
		let g = RandRange(0, 255);
		let b = RandRange(0, 255);
		return `rgb(${r}, ${g}, ${b})`;
	}

	let p = document.getElementById('helloWorld');
	let id = 0;
	p.addEventListener('click', (e) => {
		console.log('Clicked');
		clearTimeout(id);
		id = setTimeout(() => {
			p.style.color = RandColor();
		}, 3000);
	});
})();

/*12. Walk the DOM
Define function walkTheDOM(node, func)
This function should traverse every node in the DOM. Use recursion.
On each node, call func(node).*/
let walkTheDom = function (node, func) {
	func(node);
	if (node.childElementCount > 0) {
		for (let i = 0; i < node.children.length; i++) {
			WalkTheDom(node.children[i], func);
		}
	}
};
