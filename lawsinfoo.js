// lawsinfoo.js

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

        case 'iea':
            // Example HTML content for IEA
            var ipcContent = document.createElement('div');
            ipcContent.innerHTML = '<h2>International Environmental Agreements (IEA):</h2><p>International Environmental Agreements (IEA): International Environmental Agreements (IEA) constitute a vital framework for global cooperation and collective action to address pressing environmental challenges and promote sustainable development worldwide. These agreements, negotiated and ratified by countries around the globe, seek to mitigate environmental degradation, conserve natural resources, and combat climate change through shared commitments and coordinated efforts. They cover a diverse range of issues, including greenhouse gas emissions reduction, biodiversity conservation, marine protection, deforestation prevention, and sustainable energy transition. By fostering dialogue, collaboration, and mutual accountability among nations, IEAs facilitate the exchange of knowledge, technology, and best practices, enabling countries to collectively tackle environmental threats that transcend national borders. Through their implementation and enforcement, IEAs contribute to the preservation of ecosystems, the protection of vulnerable communities, and the promotion of environmental justice on a global scale.</p>';
            return ipcContent;

        case 'crpc':
            // Example HTML content for CRPC
            var crpcContent = document.createElement('div');
            crpcContent.innerHTML = '<h2>Code of Criminal Procedure (CrPC)</h2><p>The Code of Criminal Procedure (CrPC) serves as the procedural backbone of Indias criminal justice system, guiding the conduct of investigations, trials, and appeals in criminal cases. Enacted in 1973, the CrPC lays down the procedural rules and safeguards to ensure fair and impartial administration of justice. It delineates the powers and functions of various stakeholders, including law enforcement agencies, courts, prosecutors, defense attorneys, and witnesses, in the criminal justice process. Among its key provisions are those related to arrest, bail, remand, evidence, trial procedure, and sentencing. Moreover, the CrPC incorporates mechanisms for alternative dispute resolution, such as mediation and plea bargaining, to expedite the resolution of cases and reduce the burden on the judiciary. By upholding the principles of due process, equality before the law, and protection of rights, the CrPC seeks to uphold the integrity and credibility of the criminal justice system, ensuring justice for all.</p>';
    
            return crpcContent;


        case 'ida':
            // Example HTML content for IDA
            var cpcContent = document.createElement('div');
            cpcContent.innerHTML = '<h2>Intellectual Property Rights (IDA)</h2><p>Intellectual Property Rights (IDA) encompass a diverse array of legal protections granted to creators and innovators over their intangible assets, including inventions, literary works, artistic creations, designs, symbols, and trade secrets. These rights enable individuals and organizations to safeguard their intellectual investments, maintain exclusivity over their creations, and derive economic benefits through licensing and commercialization. Key forms of IDA include patents, which protect inventions and technological advancements; copyrights, which safeguard original literary, artistic, and musical works; trademarks, which identify and distinguish goods and services in the marketplace; and trade secrets, which safeguard valuable confidential information. By incentivizing innovation, creativity, and investment in research and development, IDA contribute to economic growth, technological progress, and cultural enrichment, fostering a conducive environment for entrepreneurship and knowledge creation.</p>';
            return cpcContent;

            case 'cpc':
                // Example HTML content for CPC
                var cpcContent = document.createElement('div');
                cpcContent.innerHTML = '<h2>Code of Civil Procedure (CPC):</h2><p>The Code of Civil Procedure (CPC) stands as a pillar of Indias civil justice system, providing a structured framework for the adjudication of civil disputes and the enforcement of civil rights. Enacted in 1908 and subsequently amended to reflect evolving legal principles and societal needs, the CPC governs the procedural aspects of civil litigation, ensuring fair and expeditious resolution of disputes. It delineates the jurisdiction of civil courts, the process of initiating legal proceedings, and the conduct of trials, appeals, and execution of judgments. Key provisions of the CPC include those related to pleadings, evidence, interim reliefs, and alternative dispute resolution mechanisms such as mediation and arbitration. By upholding principles of procedural fairness, transparency, and judicial efficiency, the CPC aims to facilitate access to justice, protect the rights of litigants, and maintain the integrity of the civil justice system in India.</p>';
                return cpcContent;

                case 'ipc':
                    // Example HTML content for IPC
                    var cpcContent = document.createElement('div');
                    cpcContent.innerHTML = '<h2> Indian Penal CodeIPC:</h2><p>Indian Penal Code (IPC) is the cornerstone of Indias criminal justice system, providing a comprehensive framework for defining and addressing criminal offenses. Enacted in 1860 during British rule, the IPC has evolved over the years to reflect the changing social and legal landscape of the country. It categorizes offenses into various chapters and sections, delineating the elements of each crime and prescribing corresponding punishments. From minor infractions like theft and mischief to heinous crimes like murder and sexual assault, the IPC encompasses a wide spectrum of illegal conduct. Additionally, it incorporates principles of culpability, such as intention, knowledge, and negligence, to determine criminal liability. Through its provisions, the IPC serves as a deterrent to wrongdoing, upholding the rule of law and safeguarding the rights and interests of individuals within society.</p>';
                    return cpcContent;

                    case 'mva':
                        // Example HTML content for mva
                        var cpcContent = document.createElement('div');
                        cpcContent.innerHTML = '<h2>Motor Vehicles Act (MVA):</h2><p>The Motor Vehicles Act (MVA) constitutes a comprehensive legal framework governing the registration, licensing, operation, and regulation of motor vehicles in India. Enacted in 1988 and subsequently amended to reflect emerging challenges and advancements in transportation technology, the MVA aims to promote road safety, streamline traffic management, and enhance the overall efficiency of the transport sector. It prescribes standards for vehicle design, construction, and maintenance, as well as regulations concerning driver licensing, insurance, and liability. Additionally, the MVA imposes penalties for traffic violations, such as speeding, reckless driving, and driving under the influence of alcohol or drugs, to deter unsafe practices and protect road users. By enforcing compliance with established norms and standards, the MVA contributes to reducing road accidents, minimizing congestion, and ensuring the orderly flow of traffic on Indias roadways.</p>';
                        return cpcContent;

        default:
            // Default HTML content
            var defaultContent = document.createElement('div');
            defaultContent.innerHTML = '<h2>Default Content</h2><p>This is some default HTML content.</p>';
            return defaultContent;
    }
}


