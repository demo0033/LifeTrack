var btn = document
    .getElementById("backButton")
    .addEventListener("click", function () {
        window.location = "../../index.html";
    });
var btn = document
    .getElementById("newPointButton")
    .addEventListener("click", function () {
        grabData();
    });

const setNum = localStorage.getItem('view');

var dataset = JSON.parse(localStorage.getItem('set'+setNum));

// Load data from stored JSON
var datasetName = dataset['name'];
var numAttributes = Object.keys(dataset['data']).length;
var numDatapoints = Object.keys(dataset['data']['set1']['data']).length;
var attributeNames = [];
var data = [];
for(i = 0; i < numAttributes; i++) {
    attributeNames[i] = dataset['data']['set'+(i+1)]['name'];
    data[i] = dataset['data']['set'+(i+1)]['data'];
}

// Populate page based on stored data
document.getElementById("datasetName").innerHTML = datasetName;
document.getElementById("numDatapoints").innerHTML = numDatapoints;
var attributeList = document.getElementById("attributeList");
var newPoint = document.getElementById("newPoint");
for(i = 0; i < numAttributes; i++) {
    showAttribute(i);
    addAttribute(i);
}

function showAttribute(i) {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "att"+(i+1));
    newDiv.setAttribute("class", "attribute");

    var nameSpan = document.createElement("span");
    nameSpan.innerHTML = attributeNames[i] + ": ";

    var dataSpan = document.createElement("span");
    var values = Object.values(data[i]);
    dataSpan.innerHTML = values;

    newDiv.appendChild(nameSpan);
    newDiv.appendChild(dataSpan);
    attributeList.appendChild(newDiv);
}
function addAttribute(i) {
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "att"+(i+1));
    newDiv.setAttribute("class", "attribute");

    var nameSpan = document.createElement("span");
    nameSpan.innerHTML = attributeNames[i] + ": ";

    var dataInput = document.createElement("input");
    dataInput.setAttribute("type", "text");
    dataInput.setAttribute("id", "att" + (i+1) + "value");
    dataInput.setAttribute("title","value");
    
    newDiv.appendChild(nameSpan);
    newDiv.appendChild(dataInput);
    newPoint.appendChild(newDiv);
    newPoint.appendChild(document.createElement("br"));
}

function grabData() {
    var timestamp = Date.now();
    var values = [];
    for(i = 0; i < numAttributes; i++) {
        values[i] = document.getElementById("att" + (i+1) + "value").value;
        if(values[i] == "") {
            document.getElementById("blankErr").setAttribute("style","visibility: visible; color: red;");
            return;
        }
    }
    for(i = 0; i < numAttributes; i++) {
        dataset['data']['set' + (i+1)]['data'][timestamp] = values[i];
    }
    localStorage.setItem("set"+setNum, JSON.stringify(dataset));
    location.reload();
}

/**
 * Logging function
 * Will be removed after production
 */
function logData() {
    console.log("Name: " + datasetName);
    console.log("num Attributes: " + numAttributes);
    console.log("num Datapoints: " + numDatapoints);
    for(i = 0; i < numAttributes; i++) {
        console.log("att"+(i+1)+" name: " + attributeNames[i]);
        console.log("att"+(i+1)+" data: " + data[i]);
    }
}