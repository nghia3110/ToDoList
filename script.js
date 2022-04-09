/* Modal */
var addBtn = document.getElementById('add-btn');

var addModal = document.getElementById('add-modal');

addBtn.onclick = function () {
    addModal.style.display = "block";
}

window.onclick = function (event) {
    if (event.target == addModal) {
        addModal.style.display = "none";
    }
}

/* Add task */
var acceptBtn = document.getElementById('accept-btn');
var ul = document.getElementById('task-list-doing');

acceptBtn.onclick = function () {
    var i = 0, itemCount = 0;
    while (ul.getElementsByTagName('li')[i++]) itemCount++;
    
    var taskInput = document.getElementById('input-task').value;
    const li = `<li class="task-item">
    <input type="checkbox" name="" id="task+${itemCount + 1}">
    <label for="task+${itemCount + 1}" class="task-content">${taskInput}</label>
    <button onclick="deleteTask(this.id);" class="delete-btn"><i class="fa-solid fa-trash-can"></i></button>
</li>
    `
/*
    var newLi = document.createElement('li');
    newLi.setAttribute('class', 'task-item');
    newLi.setAttribute('id', 'doing-task-' + (itemCount+1));

    var input = document.createElement('input');
    input.setAttribute('id', 'task' + (itemCount+1));
    input.setAttribute('type', 'checkbox');
    newLi.appendChild(input);

    var label = document.createElement('label');
    label.setAttribute('for', 'task' + (itemCount+1));
    label.setAttribute('class', 'task-content');
    label.innerHTML = taskInput;
    newLi.appendChild(label);

    var deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'delete-btn');
    var i = document.createElement('i');
    i.setAttribute('class', 'fa-solid fa-trash-can');
    deleteBtn.appendChild(i);
    newLi.appendChild(deleteBtn);

    ul.appendChild(newLi);
*/
    addModal.style.display = "none";
}   

/* Delete task */
ul.addEventListener('click', function(event){
    const element = event.target;
    const elementClass = element.className;
    if(elementClass == "delete-btn"){
        element.parentElement.remove();
    }else if(elementClass == "fa-solid fa-trash-can"){
        element.parentElement.parentElement.remove();
    }
    var item = ul.getElementsByTagName('li');
    for(var i = 0; i < item.length; i++){
        
    }
})
