if(!localStorage.getItem('setCount')) {
    localStorage.setItem('setCount', 0);
}

var setCount = 1;
var nextDataset = localStorage.getItem("set"+setCount);
var dataSetDiv = document.getElementById("datasets");

while(nextDataset) {
    loadDataset(nextDataset);

    setCount++;
    nextDataset = localStorage.getItem("set"+setCount);
}

function loadDataset(set) {
    var data = JSON.parse(set);
    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", "set"+setCount);
    newDiv.setAttribute("class", "dataset");
    newDiv.innerHTML = data['name'];
    var newLink = document.createElement("a");
    newLink.setAttribute("href","./src/html/ViewData.html");
    newLink.setAttribute("onClick","addSelection("+setCount+")");
    newLink.appendChild(newDiv);
    dataSetDiv.appendChild(newLink);
}

function addSelection(numClicked) {
    localStorage.setItem('view',numClicked);
}