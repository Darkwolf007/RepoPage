window.onload = function() {
    fetch('data/cards.json')
        .then(response => response.json())
        .then(data => {
            // Use the JSON data directly
            displayCards(data);
        })
        .catch(error => console.error('Error loading JSON file:', error));

    // Dark/Light Mode Toggle
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
};

function displayCards(data) {
    const container = document.getElementById('cardContainer');
    container.innerHTML = ''; // Clear existing cards
    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';

        const badge = document.createElement('div');
        badge.className = 'badge';
        badge.textContent = `${item.Badge} `;

        // Set the badge color based on the tag
        switch(item.Tag.toLowerCase()) {
            case 'sustainability':
                badge.style.backgroundColor = '#70cd70';
                break;
            case 'urban':
                badge.style.backgroundColor = '#eb6860';
                break;
            case 'architecture':
                badge.style.backgroundColor = '#7c72e5';
                break;
            case 'ai':
                badge.style.backgroundColor = '#ff69b4';
                break;
            case 'immersive':
                badge.style.backgroundColor = '#e4ff59';
                break;
            case 'creativecoding':
                badge.style.backgroundColor = '#a9a9a9';
                break;
            case 'automation':
                badge.style.backgroundColor = '#f4a460';
                break;
            default:
                badge.style.backgroundColor = '#628e23'; // Default color if no match
        }

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

function toggleTheme() {
    const body = document.body;
    const themeToggleIcon = document.querySelector('#themeToggle ion-icon');
    body.classList.toggle('dark-mode');
    
    // Change icon based on theme
    if (body.classList.contains('dark-mode')) {
        themeToggleIcon.setAttribute('name', 'sunny-outline');
    } else {
        themeToggleIcon.setAttribute('name', 'moon-outline');
    }
}
