let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");
let inputWord = "";
let resultText = document.createElement('p');
resultText.classList.add("result-heading");
searchResultsEl.appendChild(resultText);

function displayCountries(resultArray) {
    for (let eachBook of resultArray) {
        let eachBookContainer = document.createElement('div');
        eachBookContainer.classList.add('d-flex', 'flex-column', 'col-6');
        resultText.textContent = "Popular Books";
        let bookImage = document.createElement('img');
        let bookAuthor = document.createElement('p');
        let url = eachBook.imageLink;
        bookImage.src = url;
        bookAuthor.textContent = eachBook.author;
        eachBookContainer.appendChild(bookImage);
        eachBookContainer.appendChild(bookAuthor);
        searchResultsEl.appendChild(eachBookContainer);
    }
}



function searchAndAppendCountries(inputWord) {
    let url = "https://apis.ccbp.in/book-store?title=" + inputWord;
    let options = {
        method: "GET"
    };
    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            let {
                search_results
            } = jsonData;
            console.log(search_results[0]);
            if (jsonData.total === 0) {
                spinnerEl.classList.add("d-none");
                resultText.textContent = "No results found";
            } else {
                spinnerEl.classList.add("d-none");
                resultText.textContent = "Popular Books";
                displayCountries(search_results);
            }
        });
}

searchInputEl.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        inputWord = searchInputEl.value;
        searchAndAppendCountries(inputWord);
    }
});
