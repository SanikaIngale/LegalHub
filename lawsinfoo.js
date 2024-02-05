// zzzlawsinfoo.js

const urlParams = new URLSearchParams(window.location.search);
const buttonClicked = urlParams.get('law_selected');

if (buttonClicked) {
    // Call the fetchData function with the corresponding JSON file name
    fetchData(`${buttonClicked}.json`);
}

function fetchData(jsonFileName) {
    fetch(`laws_data/${jsonFileName}`)
        .then(response => response.json())
        .then(data => {
            var contentDiv = document.getElementById('content');
            contentDiv.innerHTML = ''; // Clear previous content

            // Calculate the total number of sections
            var totalSections = data.length;

            displayDefaultContent(buttonClicked);


            // Generate and display sidebar sections
            generateSidebarSections(data, totalSections);
        })
        .catch(error => {
            console.error('Error fetching JSON data:', error);
        });
}

// Update the generateSidebarSections function to capture specific range
function generateSidebarSections(data, totalSections) {
    var sidebarDiv = document.getElementById('sidebar');
    sidebarDiv.innerHTML = ''; // Clear previous sidebar content

    // Define the section range size (e.g., 10)
    var sectionRangeSize = 10;

    // Calculate the number of sections based on the range size
    var numberOfSections = Math.ceil(totalSections / sectionRangeSize);

    // Generate and append sidebar sections
    for (var i = 0; i < numberOfSections; i++) {
        var startSection = i * sectionRangeSize + 1;
        var endSection = (i + 1) * sectionRangeSize;

        var sidebarSection = document.createElement('button');
        sidebarSection.classList.add('sidebar-button');
        sidebarSection.textContent = `Sections ${startSection}-${endSection}`;

        // Add click event listener to display selected range
        sidebarSection.addEventListener('click', function (start, end) {
            // Use an anonymous function to capture start and end values
            return function() {
                displaySelectedRange(data, start, end);
            };
        }(startSection, endSection));

        sidebarDiv.appendChild(sidebarSection);
    }
}


// Function to display selected section range
function displaySelectedRange(data, startSection, endSection) {
    var contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear previous content

    try {
        data.forEach(function(item) {
            var sectionNumber = item["section"];

            // Check if the sectionNumber is within the selected range
            if (sectionNumber >= startSection && sectionNumber <= endSection) {
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
            }
        });
    } catch (error) {
        console.error('Error parsing JSON data:', error);
    }
}

function displayDefaultContent(buttonClicked) {
    var contentDiv = document.getElementById('content');
    contentDiv.innerHTML = ''; // Clear previous content

    // Get default content as HTML elements
    var defaultContent = getDefaultContent(buttonClicked);

    // Display default content
    contentDiv.appendChild(defaultContent);
}

function getDefaultContent(buttonClicked) {
    switch (buttonClicked) {
        case 'ipc':
            // Example HTML content for IPC
            var ipcContent = document.createElement('div');
            ipcContent.innerHTML = '<h2>Default Content for IPC</h2><p>This is some HTML content.</p>';
            return ipcContent;
        case 'crpc':
            // Example HTML content for CRPC
            var crpcContent = document.createElement('div');
            crpcContent.innerHTML = '<h2>Default Content for CRPC</h2><p>This is some HTML content.</p>';
            return crpcContent;
        case 'cpc':
            // Example HTML content for CPC
            var cpcContent = document.createElement('div');
            cpcContent.innerHTML = '<h2>Default Content for CPC</h2><p>This is some HTML content.</p>';
            return cpcContent;
        // Add cases for other files as needed
        default:
            // Default HTML content
            var defaultContent = document.createElement('div');
            defaultContent.innerHTML = '<h2>Default Content</h2><p>This is some default HTML content.</p>';
            return defaultContent;
    }
}


