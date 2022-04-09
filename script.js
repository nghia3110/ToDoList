/* Variables */
var addBtn = document.getElementById('add-btn');
var addModal = document.getElementById('add-modal');

var acceptBtn = document.getElementById('accept-btn');
var doingList = document.getElementById('task-list-doing');

var completedList = document.getElementById('task-list-completed');

/* Load Data From Storage */
var saveDoing = localStorage.getItem('doingLists');
var saveCompleted = localStorage.getItem('completedLists');

if(saveDoing){
    doingList.innerHTML = saveDoing;
}

if(saveCompleted){
    completedList.innerHTML = saveCompleted;
}

/* Modal */
addBtn.onclick = function () {
    addModal.style.display = "block";
}

window.onclick = function (event) {
    if (event.target == addModal) {
        addModal.style.display = "none";
    }
}

/* Add task */
acceptBtn.onclick = function () {
    var i = 0, itemCount = 0;
    while (doingList.getElementsByTagName('li')[i++]) itemCount++;
    
    var taskInput = document.getElementById('input-task').value;

    const li = `<li class="task-item">
    <input type="checkbox" name="" id="task${itemCount + 1}">
    <label for="task${itemCount + 1}" class="task-content">${taskInput}</label>
    <button class="delete-btn"><i class="fa-solid fa-trash-can"></i></button>
    </li>
    `
    doingList.insertAdjacentHTML('beforeend', li);
    localStorage.setItem('doingLists', doingList.innerHTML);
    addModal.style.display = "none";
}   

/* Delete task */
function changeInputID(tempID, ls){
    var index = parseInt(tempID.slice(-1));
    var s = tempID.slice(0, tempID.length - 1);
    var item = ls.getElementsByTagName('li');

    if(index == item.length + 1) return;
    for(var i = index - 1; i < item.length; i++){
        item[i].getElementsByTagName('input')[0].id = `${s}${i + 1}`;
        item[i].getElementsByTagName('label')[0].setAttribute('for', `${s}${i + 1}`);
    }
}

function removeTask(elm, lst){
    const elementClass = elm.className;
    var ID = '';
    if(elementClass == "delete-btn"){
        ID = elm.parentElement.getElementsByTagName('input')[0].id;
        elm.parentElement.remove();
    }else if(elementClass == "fa-solid fa-trash-can"){
        ID = elm.parentElement.parentElement.getElementsByTagName('input')[0].id;
        elm.parentElement.parentElement.remove();
    }
    if(ID == '') return;
    changeInputID(ID, lst);
}

doingList.addEventListener('click', function(event){
    const element = event.target;
    
    removeTask(element, doingList);
    localStorage.setItem('doingLists', doingList.innerHTML);
});

/* Add Completed Task */
var taskComp = '';

function removeCompTask(elm, lst){
    const elementClass = elm.className;
    var ID = '';
    if(elementClass == "task-content"){
        ID = elm.getAttribute('for');
        taskComp = elm.textContent;
        elm.parentElement.remove();
    }
    if(ID == '') return;
    changeInputID(ID, lst);
}

function addCompTask(){
    var i = 0, itemCount = 0;
    while (completedList.getElementsByTagName('li')[i++]) itemCount++;
    
    const li = `<li class="task-item">
    <input type="checkbox" name="" id="completed${itemCount + 1}" checked>
    <label for="completed${itemCount + 1}" class="task-content">${taskComp}</label>
    <button class="delete-btn"><i class="fa-solid fa-trash-can"></i></button>
    </li>
    `
    completedList.insertAdjacentHTML('beforeend', li);
}

function addDoingTask(){
    var i = 0, itemCount = 0;
    while (doingList.getElementsByTagName('li')[i++]) itemCount++;
    
    const li = `<li class="task-item">
    <input type="checkbox" name="" id="task${itemCount + 1}">
    <label for="task${itemCount + 1}" class="task-content">${taskComp}</label>
    <button class="delete-btn"><i class="fa-solid fa-trash-can"></i></button>
    </li>
    `
    doingList.insertAdjacentHTML('beforeend', li);
}

doingList.addEventListener('click', function(event){
    const element = event.target;

    removeCompTask(element, doingList);
    addCompTask();
    localStorage.setItem('doingLists', doingList.innerHTML);
    localStorage.setItem('completedLists', completedList.innerHTML);
});

completedList.addEventListener('click', function(event){
    const element = event.target;

    removeTask(element, completedList);
    removeCompTask(element, completedList);
    addDoingTask();
    localStorage.setItem('doingLists', doingList.innerHTML);
    localStorage.setItem('completedLists', completedList.innerHTML);
});