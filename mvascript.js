// Function to fetch and display JSON data
function loadJSON(callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open('GET', 'mva.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr.responseText);
        }
    };
    xhr.send(null);
}

// Function to create and display sections
function displaySections(data) {
    var sections = JSON.parse(data);
    var sectionList = document.getElementById('section-list');

    sections.forEach(function (sectionData, index) {
        var listItem = document.createElement('li');
        listItem.textContent ='Section '+ sectionData.section + ' - ' + sectionData.title;
        listItem.className = 'section-title';
        sectionList.appendChild(listItem);

        var description = document.createElement('p');
        description.textContent = sectionData.description;
        description.className = 'section-description';
        sectionList.appendChild(description);

        listItem.addEventListener('click', function () {
            toggleSectionDetails(index);
        });
    });
}

// Function to toggle section details
function toggleSectionDetails(index) {
    var descriptions = document.getElementsByClassName('section-description');
    var description = descriptions[index];

    if (description) {
        if (description.style.display === 'block') {
            description.style.display = 'none'; // Close the description if it's open
        } else {
            description.style.display = 'block'; // Open the description if it's closed
        }
    }
}

// Load JSON data and display sections
loadJSON(function (response) {
    displaySections(response);
});
