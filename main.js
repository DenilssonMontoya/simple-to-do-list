let taskDoneNumber = 0;
let taskAllNumber = 0;



//Get elements
let addButton = document.getElementById("btnAdd");
let cleanDoneButton = document.getElementById("btnCleanDone");
let cleanAllButton = document.getElementById("btnCleanAll");
let tblList = document.getElementById("tblList");


//Set click event for Clean Done
cleanDoneButton.addEventListener("click", function(event){
    cleanDoneTask();
    showTasks();
    showTaskResume();
    
});

//Set click event for Clean All
cleanAllButton.addEventListener("click", function(event){
    cleanAllTask();
    showTasks();
    showTaskResume();
});


//Set click event for input 
addButton.addEventListener("click", function(event){
    addTask();
    showTasks();
    showTaskResume();
    clearInputText();
});

let addTask = function(){
    
    let tmpArr = recoverStorageTasks();
    let toDoTask = document.getElementById("txtToDoTask").value;
    if(toDoTask == null || toDoTask == ""){
        alert("Must enter a value!");
        return;
    }

    let task = {
        description : toDoTask,
        status : 0
    }
    tmpArr.push(task);
    addStorageTasks(tmpArr);    
}

let showTasks = function(){

    tblList.innerHTML = "";
    taskDoneNumber = 0;
    taskAllNumber = 0;
    
    let storageTasks = recoverStorageTasks();
    
    storageTasks.forEach(function(task, index){
        taskAllNumber++;

        let trElement = document.createElement("tr");
        let tdTextElement = document.createElement("td");
        let tdCheckElement = document.createElement("td");

        //Texto
        let spanText  = document.createElement("span");      
        if(task.status === 1) {
            taskDoneNumber++;
            spanText.className = "taskDone";
        }       
        spanText.setAttribute("task-id",index);        
        spanText.innerHTML = task.description;                



        tdTextElement.appendChild(spanText);
        tdTextElement.className = "textColumn"
        trElement.appendChild(tdTextElement);

        //check        
        let checkElement = document.createElement("input");
        checkElement.type = "checkbox"
        checkElement.setAttribute("task-id",index);        
        if(task.status === 1) {
            checkElement.checked = true;
        }       
        checkElement.addEventListener("click", function(checkbox){            
            evaluateDoneTask(checkbox);
            showTaskResume();
        });

        tdCheckElement.appendChild(checkElement);
        tdCheckElement.className = "checkColumn"
        trElement.appendChild(tdCheckElement);
        //Add list
        tblList.appendChild(trElement);

    });
}



let evaluateDoneTask = function(event){
    
    let idList = event.target.getAttribute("task-id");
    let textElement =  event.target.parentNode.previousSibling.firstChild;
    let tmpArr = recoverStorageTasks();

    if(tmpArr[idList].status === 0) {
        //No Done -> Done
        textElement.className = "taskDone";
        tmpArr[idList].status = 1;
        taskDoneNumber++;
                
    } else{
        //Done -> Revert
        textElement.className = "";
        tmpArr[idList].status = 0;
        taskDoneNumber--;
    }
    addStorageTasks(tmpArr);    
}

let clearInputText = function(){
    let toDoTask = document.getElementById("txtToDoTask");
    toDoTask.value = "";
}

let cleanDoneTask = function(){
    let tmpArr = recoverStorageTasks();
    tmpArr = tmpArr.filter(function(element){
        return element.status === 0;         
    });

    addStorageTasks(tmpArr);
}

let cleanAllTask = function(){
    deleteStorageTasks();
}

let showTaskResume = function(){
    let spanDoneTaskNumber = document.getElementById("doneTaskNumber");
    let spanallTaskNumber = document.getElementById("allTaskNumber");
    spanDoneTaskNumber.innerHTML = taskDoneNumber;
    spanallTaskNumber.innerHTML = taskAllNumber;
}


//LocalStorage
let recoverStorageTasks = function (){
    
    let storageTasks = [];

    if(localStorage.getItem("tasks")!=null){
        storageTasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
    }

    return storageTasks;
}

let addStorageTasks = function (arrTasks){
    localStorage.setItem("tasks",JSON.stringify(arrTasks));
}

let deleteStorageTasks = function (){
    localStorage.removeItem("tasks");
}

//load

document.addEventListener('DOMContentLoaded', function() {
    showTasks();
    showTaskResume();
 });