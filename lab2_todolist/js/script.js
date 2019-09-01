
function addItem(val) {
    document.getElementById("
}


document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("newitem").addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.key === "Enter") {
	    const val = event.target.value;
	    addItem(val);
            event.target.value = "";
        }
    });
});


// document.getElementById("newitem").addEventListener("keyup", function (event) {
//         event.preventDefault();
//         if (event.keyCode === 13) {
//             addElement(this.value);
//             this.value = "";
//         }
// });
