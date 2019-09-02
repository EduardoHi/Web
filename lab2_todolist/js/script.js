
function addNewItem(val) {
    const todoList = document.getElementById("todo-list");
    todoList.append(createItem(val, todoList.childElementCount));
}

function checkItem(event) {
    const checkbox = event.target;
    const li = checkbox.parentNode.parentNode;
    const checkedList = document.getElementById("checked-todo-list");
    const todoList = document.getElementById("todo-list");

    function todoToChecked() {
	todoList.removeChild(li);
	checkedList.insertBefore(li, checkedList.firstChild);
    }
    function checkedToTodo() {
	checkedList.removeChild(li);
	todoList.append(li);
    }
    checkbox.checked ? todoToChecked() : checkedToTodo();
    checkbox.focus();
}

function createItem(val /* string */, id /* number */) {
    function createSpan() {
	const span = document.createElement("span");
	span.textContent = val;
	span.classList.add("label-text");
	return span;
    }
    function createInput() {
	const input = document.createElement("input");
	input.type = "checkbox";
	input.id = "c" + id;
	input.name = "todo";
	input.value = id;
	input.addEventListener("change", checkItem);
	input.addEventListener("keyup", 
			       listenEnter(event => {
				   event.target.checked = !event.target.checked;
				   checkItem(event);				       
			       }));
	return input;
    }

    const label = document.createElement("label");
    label.append(createInput(), createSpan());
    
    const li = document.createElement("li");
    li.append(label);

    return li;
}


function listenEnter(callback) {
    return (event) => {
        event.preventDefault();
        if (event.key === "Enter") {
	    callback(event);
        }
    }
}

window.onload = function() {
    const newItemInput = document.getElementById("newitem");
    newItemInput.focus();
}

document.addEventListener("DOMContentLoaded", function() {
    const newItemInput = document.getElementById("newitem");

    newItemInput
	.addEventListener("keyup",
			  listenEnter((event) => {
			      const val = event.target.value;
			      addNewItem(val);
			      event.target.value = "";
			  }));

    addNewItem("Hacer laboratorio de Web");
    addNewItem("Hacer Ejercicio");
    addNewItem("Ir al super");
    addNewItem("Preparar de Cenar");
    addNewItem("Tomar 2 litros de agua");
});



