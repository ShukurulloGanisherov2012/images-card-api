const mainContainer = document.querySelector(".main-card2");
const searchInput = document.querySelector("input");

function truncateTitle(title, wordsCount) {
    let words = title.split(' ');
    let truncatedWords = words.slice(0, wordsCount);
    let truncatedTitle = truncatedWords.join(' ') + (words.length > wordsCount ? '...': '');
    return truncatedTitle;
}

let cardData;
fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((cards) => {
        cardData = cards;
        displayProducts(cards);
    });

function displayProducts(cards) {
    mainContainer.innerHTML = '';
    cards.forEach((product) => {
        const cardProduct = document.createElement("div");

        cardProduct.innerHTML = `
            <main>
                <img style="width: 100px;" src="${product.image}" alt="">
                <div class="text">
                    <h2>${truncateTitle(product.title, 4)}</h2>
                    <h3><b>${product.price}</b></h3>
                </div>
            </main>
      `;
        mainContainer.appendChild(cardProduct);
        
    });
}

const productsData = [];
searchInput.addEventListener("input", () => {
    var inputValue = searchInput.value.toLowerCase();
    const filteredProducts = cardData.filter(product =>
        product.title.toLowerCase().includes(inputValue)
    );
    displayProducts(filteredProducts);
});