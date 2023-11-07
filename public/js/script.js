document.getElementById('searchButton').addEventListener('click', function() {
    var keyword = document.getElementById('searchInput').value;
    if (keyword.trim() !== '') {
        fetch(`/api/scrape?keyword=${encodeURIComponent(keyword)}`)
            .then(response => response.json())
            .then(data => {
                displayResults(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    } else {
        alert('Please enter a keyword');
    }
});

function displayResults(products) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; 

    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.title}" width="100" height="100">
            <p><strong>${product.title}</strong></p>
            <p>Rating: ${product.rating}</p>
            <p>Reviews: ${product.numReviews}</p>
        `;
        resultsContainer.appendChild(div);
    });
}
