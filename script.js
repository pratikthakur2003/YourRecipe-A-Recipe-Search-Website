const APP_ID = 'af3ab840';
const APP_KEY = '35cffa98fe906c53686e0c70dda2c2c7';
const loaderContainer = document.getElementById("loader-container");
const itemContainer = document.getElementById("item-container");
const errorMessageContainer = document.getElementById("error-message-container");

window.addEventListener("load" , fetchRecipe("paneer"));

async function fetchRecipe(query) {
    errorMessageContainer.classList.add("invisible");
    loaderContainer.classList.remove("invisible");
    itemContainer.classList.add("invisible");
    
    const res = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await res.json();
    if(data.hits.length === 0) {
        loaderContainer.classList.add("invisible");
        itemContainer.classList.add("invisible");
        errorMessageContainer.classList.remove("invisible");
        return;
    }

    bindData(data.hits);
    
    loaderContainer.classList.add("invisible");
    itemContainer.classList.remove("invisible");

}

function bindData(hits) {
    const container = document.getElementById("item-container");
    const itemTemplate = document.getElementById("template-item");
    container.innerHTML = "";

    hits.forEach((item) => {
        const itemClone = itemTemplate.content.cloneNode(true);
        fillDatainItem(itemClone , item);
        container.appendChild(itemClone);
        
    });
}

function fillDatainItem(itemClone , item) {
    const itemImg = itemClone.querySelector("#template-item-image");
    const itemName = itemClone.querySelector("#item-name");
    const itemSource = itemClone.querySelector("#item-source");
    const itemSourceLink = itemClone.querySelector("#item-source-link");

    itemImg.src = item.recipe.image;
    itemName.innerHTML = item.recipe.label;
    itemSource.innerHTML = item.recipe.source;

    itemSourceLink.addEventListener("click", () => {
        window.open(item.recipe.url, "_blank");
    })
    
}

const searchButton = document.getElementById("search-button");
const searchBar = document.getElementById("search-bar");

searchBar.addEventListener("keyup" , (event) => {
    if(!searchBar.value) return;
    if(event.key === "Enter") {
        fetchRecipe(searchBar.value);
    }
});
searchButton.addEventListener("click" , () => {
    if(!searchBar.value) return;
    fetchRecipe(searchBar.value);
});

const homeTag = document.getElementById("home-tag");
homeTag.addEventListener("click" , () => {
    alert("This is the HOME Page !!!");
});