window.onload = function() {
    fetch('data/cards.json')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            console.log("Data loaded:", data);
            displayCards(data);
            populateDropdowns(data);
            setEventListeners(data);  // Set up event listeners for filtering
        })
        .catch(error => console.error('Error loading JSON file:', error));

    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
};

function displayCards(data) {
    const container = document.getElementById('cardContainer');
    container.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-type', item.Tag);
        card.setAttribute('data-tool', item.Badge);
        card.setAttribute('data-train', item.Train);

        const badge = document.createElement('div');
        badge.className = 'badge';
        badge.textContent = item.Badge;

        const colors = {
            'sustainability': '#70cd70',
            'urban': '#eb6860',
            'architecture': '#7c72e5',
            'ai': '#ff69b4',
            'immersive': '#e4ff59',
            'creativecoding': '#a9a9a9',
            'automation': '#f4a460'
        };
        badge.style.backgroundColor = colors[item.Tag.toLowerCase()] || '#628e23';
        card.appendChild(badge);

        const title = document.createElement('h2');
        title.textContent = item.Name;
        card.appendChild(title);

        const description = document.createElement('p');
        description.textContent = item.Description;
        card.appendChild(description);

        container.appendChild(card);
    });
}

function populateDropdowns(data) {
    const typeSet = new Set();
    const toolSet = new Set();
    const trainSet = new Set();

    data.forEach(item => {
        typeSet.add(item.Tag);
        toolSet.add(item.Badge);
        trainSet.add(item.Train);
    });

    addOptionsToDropdown('typeFilter', typeSet);
    addOptionsToDropdown('toolFilter', toolSet);
    addOptionsToDropdown('trainFilter', trainSet);
}

function addOptionsToDropdown(id, values) {
    const dropdown = document.getElementById(id);
    dropdown.innerHTML = `<option value="">${dropdown.options[0].textContent}</option>`;

    values.forEach(value => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        dropdown.appendChild(option);
    });
}

function setEventListeners(data) {
    document.getElementById('typeFilter').addEventListener('change', () => filterCards(data));
    document.getElementById('toolFilter').addEventListener('change', () => filterCards(data));
    document.getElementById('trainFilter').addEventListener('change', () => filterCards(data));
    document.getElementById('clearFilters').addEventListener('click', () => clearFilters(data));
}

function filterCards(data) {
    const selectedType = document.getElementById('typeFilter').value;
    const selectedTool = document.getElementById('toolFilter').value;
    const selectedTrain = document.getElementById('trainFilter').value;

    const filteredData = data.filter(item => {
        return (
            (selectedType === '' || item.Tag === selectedType) &&
            (selectedTool === '' || item.Badge === selectedTool) &&
            (selectedTrain === '' || item.Train === selectedTrain)
        );
    });

    const container = document.getElementById('cardContainer');
    container.innerHTML = ''; // Clear existing cards

    if (filteredData.length > 0) {
        displayCards(filteredData);
    } else {
        container.innerHTML = '<p>No matching items found.</p>'; // Message for no results
    }
}

function clearFilters(data) {
    document.getElementById('typeFilter').value = '';
    document.getElementById('toolFilter').value = '';
    document.getElementById('trainFilter').value = '';
    displayCards(data); // Show all cards
}

function toggleTheme() {
    const body = document.body;
    const themeToggleIcon = document.querySelector('#themeToggle ion-icon');
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        themeToggleIcon.setAttribute('name', 'sunny-outline');
    } else {
        themeToggleIcon.setAttribute('name', 'moon-outline');
    }
}
