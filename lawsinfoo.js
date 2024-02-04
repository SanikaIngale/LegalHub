// Load JSON function
function loadJSON(filename, callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', filename, true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                callback(xhr.responseText);
            } else {
                console.error('Failed to load JSON file: ' + filename);
            }
        }
    };
    xhr.send(null);
}

// Display Content function
function displayContent(data) {
    var contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear previous content

    try {
        var jsonData = JSON.parse(data);
        jsonData.forEach(function(item) {
            var sectionNumber = item["section"];
            var sectionTitle = item["section_title"];
            var sectionDesc = item["section_desc"];

            var sectionDiv = document.createElement('div');
            sectionDiv.classList.add('section');

            var sectionHeader = document.createElement('h3');
            sectionHeader.textContent = "Section " + sectionNumber + ": " + sectionTitle;
            sectionDiv.appendChild(sectionHeader);

            var descParagraph = document.createElement('p');
            descParagraph.textContent = sectionDesc;
            sectionDiv.appendChild(descParagraph);

            contentDiv.appendChild(sectionDiv);
        });
    } catch (error) {
        console.error('Error parsing JSON data:', error);
    }
}

// Add event listeners for sidebar buttons
function addEventListenerToButton(id, start, end) {
    document.getElementById(id).addEventListener("click", function () {
        loadJSON("iea.json", function(data) {
            try {
                var filteredData = JSON.parse(data).filter(function(item) {
                    return item.section >= start && item.section <= end;
                });
                displayContent(JSON.stringify(filteredData));
            } catch (error) {
                console.error('Error processing JSON data:', error);
            }
        });
    });
}

// Add event listeners for section range buttons
addEventListenerToButton("sections1to10", 1, 10);
addEventListenerToButton("sections11to20", 11, 20);
addEventListenerToButton("sections31to40", 31, 40);
addEventListenerToButton("sections41to50", 41, 50);
addEventListenerToButton("sections51to60", 51, 60);
addEventListenerToButton("sections61to70", 61, 70);
addEventListenerToButton("sections71to80", 71, 80);
addEventListenerToButton("sections81to90", 81, 90);
addEventListenerToButton("sections91to100", 91, 100);
addEventListenerToButton("sections101to200", 101, 200);