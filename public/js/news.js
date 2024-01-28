document.addEventListener('DOMContentLoaded', () => {
    const renderNews = document.getElementById('news-container');
  
    // Function to fetch news data from the API
    const fetchNewsData = async () => {
      try {
        const response = await fetch('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=ebfa7c310b41464783d2ce9116ab9f80');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching news:', error);
        return null;
      }
    };
  
    // Function to render news
    const renderNewsArticles = (newsData) => {
      renderNews.innerHTML = ''; // Clear previous content
  
      // Check if there are articles
      if (newsData.articles && newsData.articles.length > 0) {
        // Loop through articles and create HTML elements
        newsData.articles.forEach(article => {
          const newsItem = document.createElement('div');
          newsItem.classList.add('news-item');
  
          const title = document.createElement('h3');
          title.textContent = article.title;
  
          const description = document.createElement('p');
          description.textContent = article.description;
  
          const source = document.createElement('p');
          source.textContent = `Source: ${article.source.name}`;
  
          const publishedAt = document.createElement('p');
          publishedAt.textContent = `Published At: ${new Date(article.publishedAt).toLocaleString()}`;
  
          const image = document.createElement('img');
          image.src = article.urlToImage;
          image.alt = 'News Image';
  
          newsItem.appendChild(title);
          newsItem.appendChild(description);
          newsItem.appendChild(source);
          newsItem.appendChild(publishedAt);
          newsItem.appendChild(image);
  
          renderNews.appendChild(newsItem);
        });
      } else {
        renderNews.innerHTML = '<p>No news available.</p>';
      }
    };
  
    // Fetch news data and render when the page loads
    fetchNewsData().then((newsData) => {
      if (newsData) {
        renderNewsArticles(newsData);
      }
    });
  });
  