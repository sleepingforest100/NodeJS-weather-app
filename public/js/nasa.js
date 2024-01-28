document.addEventListener('DOMContentLoaded', () => {
    const renderApod = document.getElementById('apod-container');

    // Function to fetch and render NASA's APOD
    const fetchApodData = async () => {
        try {
            const apodResponse = await fetch('/apod');
            const apodData = await apodResponse.json();
            renderApodCard(apodData);
        } catch (error) {
            console.error(error);
            renderApod.innerHTML = '<p>Error fetching NASA APOD data.</p>';
        }
    };

    // Function to render NASA's APOD on the page
    const renderApodCard = (apodData) => {
        if (apodData && apodData.url) {
            const container = document.createElement('div');
            container.classList.add('apod-container');

            const title = document.createElement('h3');
            title.textContent = apodData.title;

            const explanation = document.createElement('p');
            explanation.textContent = apodData.explanation;

            const media = apodData.media_type === 'image'
                ? `<img src="${apodData.url}" alt="NASA APOD">`
                : `<iframe width="560" height="315" src="${apodData.url}" frameborder="0" allowfullscreen></iframe>`;

            container.appendChild(title);
            container.appendChild(explanation);
            container.innerHTML += media;

            renderApod.innerHTML = '';
            renderApod.appendChild(container);
        } else {
            renderApod.innerHTML = '<p>No NASA APOD available.</p>';
        }
    };

    // Call the function to fetch and render NASA's APOD data
    fetchApodData();
});
