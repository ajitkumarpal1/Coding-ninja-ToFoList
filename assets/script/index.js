const todoListItem = document.getElementById("todo-list-item");
const addList = document.querySelector("#add-list");
const todolistarray = [];
const tasksLeft = document.querySelector("#tasks-left");
const selectAll = document.getElementById("select-all");
const deleteComplited = document.querySelector("#delete-complited")
function streamToHtmlElement(streamContent) {
    // Assuming streamContent is a string representing HTML content
    const parser = new DOMParser();
    const doc = parser.parseFromString(streamContent, 'text/html');

    // The content of the stream is now parsed into a DOM structure
    // You can access and manipulate the DOM elements as needed
    console.log(doc.body)
    return doc.body.firstChild;
}
const liElement = streamToHtmlElement(`<li>
                <div class="checkbox-wrapper">
                    <input type="checkbox" id="check-1" name="check" value="" />
                    <label for="check-1">
                        <span></span>
                    </label>
                    <i class="fa fa-times delet-me" aria-hidden="true"></i>
                </div>
                </li>`)
const todoUl = document.querySelector("#todo-ul")
const uplodeTodoUl = () => {
    let copy = liElement.cloneNode(true);
    let tampObj = {
        do: todoListItem.value,
        selected: false,
    }
    let index = todolistarray.length;
    copy.querySelector("input").setAttribute("id", "check" + (String(index + 1)))
    copy.querySelector("input").addEventListener("click",()=>{
        tasksLeftFun();
        all();
        tampObj.selected = !tampObj.selected;
        
    });
    copy.querySelector("label").setAttribute("for", "check" + (String(index + 1)))
    copy.querySelector("span").insertAdjacentText("afterend", tampObj.do);
    
    tampObj.deleteMe = function () {
        copy.remove()
        console.log(this)
        todolistarray.splice(todolistarray.indexOf(tampObj), 1)
        tasksLeftFun() 
        all()
    }
    tampObj.element = copy;

    copy.querySelector("i").addEventListener("click", tampObj.deleteMe)
    todoListItem.value = ""
    todolistarray.push(tampObj)
    todoUl.appendChild(copy);
    showAddBtn()
    tasksLeftFun()
    all()
}
addList.addEventListener("click", uplodeTodoUl)
todoListItem.addEventListener("input", showAddBtn)
function showAddBtn() {
    if (todoListItem.value != "") {
        if (addList.style.display === "none") {
            addList.style.display = "block";
        }
    }
    else {
        addList.style.display = "none";
    }
}
function tasksLeftFun() {
    let allSelected = document.querySelectorAll("input[name=check]:checked")
    tasksLeft.innerHTML = todolistarray.length - allSelected.length
}
selectAll.addEventListener("click", function () {
    let allSelected = document.querySelectorAll("input[name=check]");
    allSelected.forEach(element => {
        element.checked = true;
    });
    all()
});
deleteComplited.addEventListener("click",function(){
    todolistarray.forEach((element, index) => {
        if(element.selected){
            element.element.remove()
            alert(index)
            todolistarray.splice(index,1)
        }
    });
    all()
})
function all() {
    let allSelected = document.querySelectorAll("input[name=check]")
    let allSelectedTrue = document.querySelectorAll("input[name=check]:checked")
    if(allSelected.length == allSelectedTrue.length){
        document.querySelector("#completed").style.color = "black";
        selectAll.style.color = "black";
    }
    else{
        document.querySelector("#completed").style.color = "#7ea4ae";
        selectAll.style.color = "#7ea4ae";
    }
    if(allSelectedTrue.length == 0){
        document.querySelector("#all").style.color = "black";
    }else{
        document.querySelector("#all").style.color = "#7ea4ae";
    }
    if(allSelected.length != allSelectedTrue.length){
        document.querySelector("#uncompleted").style.color = "black";
    }else{
        document.querySelector("#uncompleted").style.color = "#7ea4ae";
    }
}

