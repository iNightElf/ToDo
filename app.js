const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-task');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners(){
    //dom load event
    document.addEventListener('DOMContentLoaded', getTasks)

    // Add task event
    form.addEventListener('submit', addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //clear task event
    clearBtn.addEventListener('click', clearTask)
    //filter task event
    filter.addEventListener('keyup',filterTasks)
}

// Get Tasks from LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.forEach(function(task){
      // Create li element
      const li = document.createElement('li');
      // Add class
      li.className = 'collection-item';
      // Create text node and append to li
      li.appendChild(document.createTextNode(task));
      // Create new link element
      const link = document.createElement('a');
      // Add class
      link.className = 'delete-item secondary-content';
      // Add icon html
      link.innerHTML = '<i class="fa fa-remove"></i>';
      // Append the link to li
      li.appendChild(link);
  
      // Append li to ul
      taskList.appendChild(li);
    });
  }


function addTask(e){
    if(taskInput.value === '') {
        alert("Hi");
    }
    // Create li element
    const li = document.createElement('li');
    li.className = 'collection-item';
    //Create textNode
    li.appendChild(document.createTextNode(taskInput.value));
    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML='<i class="fa fa-remove"></i>';
    li.appendChild(link);
    //append li to ul
    //console.log(li);
    taskList.appendChild(li);

    //localstorege

    storeTaskInLocalStorage(taskInput.value);


    //clear input
    taskInput.value='';

    e.preventDefault();
}

// Store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
  
    tasks.push(task);
    console.log(tasks)
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

//remover task
function removeTask(e){
    if(e.target.classList.contains('fa-remove')){
        e.target.parentElement.parentElement.remove();
        
        //romove from ls
        removeTaskFromLocalStorage
        (e.target.parentElement.parentElement)
    }
}

//remove from ls
function removeTaskFromLocalStorage(taskItem){
    //console.log(taskItem);

    let tasks;
    if(localStorage.getItem('tasks') === null){
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//clear task
function clearTask(e){
    //taskList.innerHTML = '';

    //while loop

    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}

//filter task 
function filterTasks(e){
    const text = e.target.value.toLowerCase();
    document.querySelectorAll('.collection-item').forEach(task=>{
        const item= task.firstChild.textContent;
        if(item.toLocaleLowerCase().indexOf(text) != -1){
            task.style.display = 'block';
        }else{
            task.style.display = 'none';
        }
    })
}