const form = document.getElementById("attributeList");
var numAttributes = 0;

function addField() {
    numAttributes++;

    var newDiv = document.createElement("div");

    var newBr = document.createElement("br");
    newDiv.appendChild(newBr);

    var newLabel = document.createElement("label");
    newLabel.setAttribute("for","att" + numAttributes);
    newLabel.innerHTML = "Attribute " + numAttributes + ": ";
    newDiv.appendChild(newLabel);

    var newField = document.createElement("input");
    newField.setAttribute("type", "text");
    newField.setAttribute("id", "att" + numAttributes);
    newField.setAttribute("placeholder","Name");
    newField.setAttribute("title","Dataset name");
    newDiv.appendChild(newField);

    form.appendChild(newDiv);

    if(numAttributes>1) {
        document.getElementById("deleteField").removeAttribute("disabled");
    }
    if (numAttributes>4) {
        document.getElementById("newField").setAttribute("disabled","");
    }

}

function removeField() {
    form.removeChild(form.lastChild);
    numAttributes--;

    if(numAttributes<2) {
        document.getElementById("deleteField").setAttribute("disabled","");
    }
    if (numAttributes<5) {
        document.getElementById("newField").removeAttribute("disabled");
    }
}

function createDataset() {
    var setName = document.getElementById("title").value;
    if(setName == "") {
        document.getElementById("blankErr").setAttribute("style","visibility: visible; color: red;");
        return;
    }
    var dataset = {
        'name': setName,
        'data': {}
    }
    for(i = 1; i <= numAttributes; i++) {
        var attName = document.getElementById("att"+i).value;
        if(attName == "") {
            document.getElementById("blankErr").setAttribute("style","visibility: visible; color: red;");
            return;
        }
        dataset['data']['set'+i] = {
            'name': attName,
            'data': {}
        }
    }
    var setCount = localStorage.getItem('setCount');
    setCount++;
    localStorage.setItem('setCount', setCount);
    localStorage.setItem("set"+setCount, JSON.stringify(dataset));
    window.location = "/index.html";
}

addField();

var btn = document
    .getElementById("newField")
    .addEventListener("click", function () {
        addField();
    });

var btn = document
    .getElementById("deleteField")
    .addEventListener("click", function () {
        removeField();
    });

var btn = document
    .getElementById("submit")
    .addEventListener("click", function () {
        createDataset();
    });

var btn = document
    .getElementById("cancel")
    .addEventListener("click", function () {
        window.location = "/index.html";
    });