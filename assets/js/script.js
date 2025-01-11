const urls = [
    "https://www.seagate.com/as/en/",
    "https://www.seagate.com/au/en/",
    "https://www.seagate.com/in/en/",
    "https://www.seagate.com/id/id/",
    "https://www.seagate.com/sg/en/",
    "https://www.seagate.com/kr/ko/",
    "https://www.seagate.com/jp/ja/",
    "https://www.seagate.com/tw/zh/",
    "https://www.seagate.com/cn/zh/",
    "https://www.seagate.com/be/nl/",
    "https://www.seagate.com/be/fr/",
    "https://www.seagate.com/de/de/",
    "https://www.seagate.com/es/es/",
    "https://www.seagate.com/fr/fr/",
    "https://www.seagate.com/it/it/",
    "https://www.seagate.com/nl/nl/",
    "https://www.seagate.com/pl/pl/",
    "https://www.seagate.com/pt/pt/",
    "https://www.seagate.com/gb/en/",
    "https://www.seagate.com/em/en/",
    "https://www.seagate.com/tr/tr/",
    "https://www.seagate.com/br/pt/",
    "https://www.seagate.com/la/es/",
    "https://www.seagate.com/ca/en/",
    "https://www.seagate.com/ca/fr/",
    "https://www.seagate.com/"
];

const regions = {
    APAC: [
        "https://www.seagate.com/as/en/",
        "https://www.seagate.com/au/en/",
        "https://www.seagate.com/in/en/",
        "https://www.seagate.com/id/id/",
        "https://www.seagate.com/sg/en/",
        "https://www.seagate.com/kr/ko/",
        "https://www.seagate.com/jp/ja/",
        "https://www.seagate.com/tw/zh/",
        "https://www.seagate.com/cn/zh/"
    ],
    EMEA: [
        "https://www.seagate.com/be/nl/",
        "https://www.seagate.com/be/fr/",
        "https://www.seagate.com/de/de/",
        "https://www.seagate.com/es/es/",
        "https://www.seagate.com/fr/fr/",
        "https://www.seagate.com/it/it/",
        "https://www.seagate.com/nl/nl/",
        "https://www.seagate.com/pl/pl/",
        "https://www.seagate.com/pt/pt/",
        "https://www.seagate.com/gb/en/",
        "https://www.seagate.com/em/en/",
        "https://www.seagate.com/tr/tr/"
    ],
    AMER: [
        "https://www.seagate.com/br/pt/",
        "https://www.seagate.com/la/es/",
        "https://www.seagate.com/ca/en/",
        "https://www.seagate.com/ca/fr/",
        "https://www.seagate.com/"
    ]
};

function processLink(region = null) {
    const input = document.getElementById('placeholderInput').value.trim();
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ""; // Clear previous output

    // Check if the URL is valid and starts with Seagate domains
    const isSeagateUrl = input.startsWith("https://www.seagate.com/") || input.startsWith("https://wwwedit.seagate.com//");
    if (!isSeagateUrl) {
        outputDiv.innerHTML = `<p><span>Error:</span> The input is not a valid Seagate URL. Please enter a URL starting with 'https://www.seagate.com/' or 'https://wwwedit.seagate.com//'.</p>`;
        return;
    }

    // Extract the path after the domain
    const path = input.split('/').slice(3).join('/'); // Get everything after the domain
    if (!path) {
        outputDiv.innerHTML = `<p><span>Error:</span> The input URL does not contain valid data after the domain.</p>`;
        return;
    }

    // If the URL starts with "https://wwwedit.seagate.com//", update all base URLs to start with this domain
    const baseUrls = input.startsWith("https://wwwedit.seagate.com//")
        ? urls.map(url => url.replace("https://www.seagate.com/", "https://wwwedit.seagate.com//"))
        : urls;

    // Filter URLs by region if a region is selected
    const filteredUrls = region ? regions[region] : baseUrls;

    // Generate the new URLs by appending the path to the base URLs
    const updatedUrls = filteredUrls.map(url => url + path);

    // Display the generated links, each on a new line
    updatedUrls.forEach(url => {
        const linkElement = document.createElement('a');
        linkElement.href = url;
        linkElement.textContent = url;
        linkElement.target = "_blank";
        outputDiv.appendChild(linkElement);
    });

    // Show the output div and the "Copy All" and "Clear" buttons
    outputDiv.style.display = "block";
    document.getElementById('copy-all-btn').style.display = "inline-block";
    document.getElementById('clear-btn').style.display = "inline-block";
}

function copyAllLinks() {
    const outputDiv = document.getElementById('output');
    const allLinks = outputDiv.querySelectorAll('a');

    let allUrls = "";
    allLinks.forEach(link => {
        allUrls += link.href + "\n";
    });

    const tempInput = document.createElement('textarea');
    tempInput.value = allUrls;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);

    alert("All links copied!");
}

function clearAll() {
    document.getElementById('placeholderInput').value = ""; // Clear input field
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ""; // Clear output
    outputDiv.style.display = "none"; // Hide output
    document.getElementById('copy-all-btn').style.display = "none"; // Hide Copy All button
    document.getElementById('clear-btn').style.display = "none"; // Hide Clear button
}
