const urls = [
    "https://www.seagate.com/as/en/products/",
    "https://www.seagate.com/au/en/products/",
    "https://www.seagate.com/in/en/products/",
    "https://www.seagate.com/id/id/products/",
    "https://www.seagate.com/sg/en/products/",
    "https://www.seagate.com/kr/ko/products/",
    "https://www.seagate.com/jp/ja/products/",
    "https://www.seagate.com/tw/zh/products/",
    "https://www.seagate.com/cn/zh/products/",
    "https://www.seagate.com/be/nl/products/",
    "https://www.seagate.com/be/fr/products/",
    "https://www.seagate.com/de/de/products/",
    "https://www.seagate.com/es/es/products/",
    "https://www.seagate.com/fr/fr/products/",
    "https://www.seagate.com/it/it/products/",
    "https://www.seagate.com/nl/nl/products/",
    "https://www.seagate.com/pl/pl/products/",
    "https://www.seagate.com/pt/pt/products/",
    "https://www.seagate.com/gb/en/products/",
    "https://www.seagate.com/em/en/products/",
    "https://www.seagate.com/tr/tr/products/",
    "https://www.seagate.com/br/pt/products/",
    "https://www.seagate.com/la/es/products/",
    "https://www.seagate.com/ca/en/products/",
    "https://www.seagate.com/ca/fr/products/",
    "https://www.seagate.com/products/"
];

function processLink() {
    const input = document.getElementById('placeholderInput').value.trim();
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = ""; // Clear previous output

    // Determine the base path to replace: '/products/' or '/support/'
    const basePath = input.includes("/products/") ? "/products/" : input.includes("/support/") ? "/support/" : null;

    // Check if the input is valid
    if (!basePath) {
        outputDiv.innerHTML = `<p><span>Error:</span> Please enter a valid link containing '/products/' or '/support/'.</p>`;
        return;
    }

    // Extract the part of the URL after the base path
    const relativePath = input.split(basePath)[1];
    if (!relativePath) {
        outputDiv.innerHTML = `<p><span>Error:</span> The input link does not contain valid data after '${basePath}'.</p>`;
        return;
    }

    // Generate the new URLs by appending the relative path to the base URLs
    const updatedUrls = urls.map(url => url.replace("/products/", basePath) + relativePath);

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