document.getElementById('searchButton').addEventListener('click', search);
document.getElementById('searchInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        search();
    }
});

function search() {
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
}

function displayResults(products) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; 

    products.forEach(product => {
        const productLink = product.amazonUrl || '#'; 
        const div = document.createElement('div');
        div.className = 'product';
        div.innerHTML = `
            <a href="${productLink}" target="_blank" rel="noopener noreferrer">
                <img src="${product.imageUrl}" alt="${product.title}">
            </a>
            <div class="product-description">
                <p><strong>${product.title}</strong></p>
            </div>
            <button class="show-more">Ver mais</button>
            <p>Rating: ${product.rating}</p>
            <p>Reviews: ${product.numReviews}</p>
        `;
        resultsContainer.appendChild(div);

        const showMoreBtn = div.querySelector('.show-more');
        const productDescription = div.querySelector('.product-description');
        showMoreBtn.addEventListener('click', () => {
            productDescription.classList.toggle('expanded');
            showMoreBtn.textContent = productDescription.classList.contains('expanded') ? 'Ver menos' : 'Ver mais';
        });
    });
}



