const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false;

// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

// Drag Functionality
let draggedItem;
let currentColumn;

// Get Arrays from localStorage if available, set default values if not
const getSavedColumns = () => {
	if (localStorage.getItem('backlogItems')) {
		backlogListArray = JSON.parse(localStorage.backlogItems);
		progressListArray = JSON.parse(localStorage.progressItems);
		completeListArray = JSON.parse(localStorage.completeItems);
		onHoldListArray = JSON.parse(localStorage.onHoldItems);
	} else {
		backlogListArray = ['Release the course', 'Sit back and relax'];
		progressListArray = ['Work on projects', 'Listen to music'];
		completeListArray = ['Being cool', 'Getting stuff done'];
		onHoldListArray = ['Being uncool'];
	}
};

// Set localStorage Arrays
const updateSavedColumns = () => {
	listArrays = [
		backlogListArray,
		progressListArray,
		completeListArray,
		onHoldListArray,
	];
	const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];

	arrayNames.forEach((arrayName, index) => {
		localStorage.setItem(
			`${arrayName}Items`,
			JSON.stringify(listArrays[index])
		);
	});
};

// Create DOM Elements for each list item
const createItemEl = (columnEl, column, item, index) => {
	// console.log('columnEl:', columnEl);
	// console.log('column:', column);
	// console.log('item:', item);
	// console.log('index:', index);
	// List Item
	const listEl = document.createElement('li');
	listEl.classList.add('drag-item');
	listEl.textContent = item;
	listEl.draggable = true;
	listEl.setAttribute('ondragstart', 'drag(event)');
	// Append
	columnEl.appendChild(listEl);
};
//
// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
const updateDOM = () => {
	// Check localStorage once
	if (!updatedOnLoad) {
		getSavedColumns();
	}
	// Backlog Column
	backlogList.textContent = '';
	backlogListArray.forEach((backlogItem, index) => {
		createItemEl(backlogList, 0, backlogItem, index);
	});
	// Progress Column
	progressList.textContent = '';
	progressListArray.forEach((progressItem, index) => {
		createItemEl(progressList, 0, progressItem, index);
	});
	// Complete Column
	completeList.textContent = '';
	completeListArray.forEach((completeItem, index) => {
		createItemEl(completeList, 0, completeItem, index);
	});
	// On Hold Column
	onHoldList.textContent = '';
	onHoldListArray.forEach((onHoldItem, index) => {
		createItemEl(onHoldList, 0, onHoldItem, index);
	});
	// Run getSavedColumns only once, Update Local Storage
	updatedOnLoad = true;
	updateSavedColumns();
};

// Show Add item input box
const showInputBox = (column) => {
	addBtns[column].style.visibility = 'hidden';
	saveItemBtns[column].style.display = 'flex';
	addItemContainers[column].style.display = 'flex';
};

// hide item input box

const hideInputBox = (column) => {
	console.log('column', column );
	addBtns[column].style.visibility = 'visible';
	saveItemBtns[column].style.display = 'none';
	addItemContainers[column].style.display = 'none';
};

// Alllows arrays to reflect Drag and Drop items
const rebuildArrays = () => {
	backlogListArray = [];
	for (let i = 0; i < backlogList.children.length; i++) {
		backlogListArray.push(backlogList.children[i].textContent);
	}
	backlogListArray = [];
	for (let i = 0; i < progressList.children.length; i++) {
		progressListArray.push(progressList.children[i].textContent);
	}
	backlogListArray = [];
	for (let i = 0; i < completeList.children.length; i++) {
		completeListArray.push(completeList.children[i].textContent);
	}
	backlogListArray = [];
	for (let i = 0; i < onHoldList.children.length; i++) {
		onHoldListArray.push(onHoldList.children[i].textContent);
	}
	updateDOM();
};

// When item starts dragging
const drag = (e) => {
	draggedItem = e.target;
	console.log('draggedItem', draggedItem);
};

// When item enters column area
const dragEnter = (column) => {
	listColumns[column].classList.add('over');
	currentColumn = column;
};

// Column Allows for Iteem to drop
const allowDrop = (e) => {
	e.preventDefault();
};

// Dropping item in column
const drop = (e) => {
	e.preventDefault();
	// remove background color padding:
	listColumns.forEach((column) => {
		column.classList.remove('over');
	});

	// add item to column
	const parent = listColumns[currentColumn];
	parent.appendChild(draggedItem);
};

// on Load

updateDOM();
