var homeBtnEl = document.querySelector("#home-btn");
var dinnerBtnEl = document.querySelector("#dinner-btn");
var wineBtnEl = document.querySelector("#wine-btn")
var movieBtnEl = document.querySelector("#movie-btn")
var mainWindow = document.querySelector("#main-window");
var searchByRecipes = document.querySelector("#recipeToSearch");
var searchRecBtn = document.querySelector("#input-field");
var recipSchBtn = document.querySelector("#recipe-search-btn")
var ingredSchBtn = document.querySelector("#ingredient-search-btn")
var ingredientSearch = document.querySelector("#ingredient-search")
var currentRecipeIndex = 0;

//HTML / CSS
//Utilize Materialize CSS framework for page design and layout
// Header/jumbotron remains constant throughout page changes
//One main Div/Container for the body that will contain all of the dynamically generate content

//bulk of content will dynamically generate from Javascript
// input forms with input fields and buttons to gather the user data

//search functionality will be minimum to start and will add functionality later, will focus on search by ingredients to start

//allow users to create a list of pantry items that is saved to an array in local storage for future access

//possible additional features for ingredient substitutions for things you dont have

//retrieve matching recipes from api and display them on cards for the user to choose from with image, used ingredients, and missing ingredients

//user clicks on cards to view full recipe with ingredients and instructions. User can click button to open recipe in a new tab, possible to save Recipe ID for future access?

//user submits optional form for wine budget, dynamically generate info on suggested pairings with wine cards for each product match, clicking on card displays modal with description and

//final section utilizes Netflix search API to find a movie to watch, one large input group with multiple fields to help narrow down search query, genre will be a dropdown list of the most common/popular categories

//display first 5 results on cards with image, title, year, and imdb rating. user can click/hover on card for modal/popout with description of the title.

//summary page gives overview of the results that have been selected, can hover/click for more information about their selections

//getStarted()
// intitial function ran on page load, generates description of the web app and button that begins the series of forms for the user by calling displayRecipeOptions()

// displayRecipeOptions()
// generate div content for page with description of choices between searching for a recipe by name or searching by ingredients you have in your pantry. creates two buttons that lead to the next set of functions

ingredSchBtn.addEventListener("click", function(event) {
  event.preventDefault();
  mainWindow.classList.add("hide")
  ingredientSearch.classList.remove("hide")
})
// thePantryPage()
// generates a description of the pantry page and how it functions, includes input form for ingredients, calls savePantry on submission and Update Pantry to populate items

function savePantry() {
  localStorage.setItem("pantry", pantry)
}
// allows the user to add food items to their pantry list and save them to local storage

// updatePantry()  and removeItem()??
//updates/generates the list of user pantry items on screen, also used to remove items from the list
var pantryFormEl = document.querySelector('#ingredients-add');
var pantryListEl = document.querySelector('#ingredients-list');
var ingredientBtnEl = document.querySelector('#add-ingredient-btn');
var pantrySaveEl = document.querySelector("#save-pantry-btn")
var pantry = [];

// function to handle form submission
ingredientBtnEl.addEventListener('click', function(event){
  
  event.preventDefault();
  
  var ingredient = pantryFormEl.value;
  console.log(pantryFormEl.value);
  
  if (!ingredient) {
    console.log('No ingredients filled out in form!');
    return;
  }
  
  var listItemEl = document.createElement("li");
  listItemEl.textContent = ingredient;

  var deleteBtnEl = document.createElement("button");
  deleteBtnEl.textContent = "x";

  deleteBtnEl.addEventListener("click", function(event){
    event.preventDefault();
    pantryListEl.removeChild(listItemEl);
    pantry.splice(pantry.indexOf(event.target))
    console.log(pantry)
  })
  
  listItemEl.appendChild(deleteBtnEl);
  
  pantryListEl.appendChild(listItemEl);
  
  pantry.push(ingredient);


pantryFormEl.value = ('');

console.log(pantry)

})

mainWindow.addEventListener('click', function(event){
    console.log(event.target);
if(event.target == document.getElementById("get-more-recipes")) {
    console.log(document.getElementById("get-more-recipes"));
    generateCards(mainWindow.childNodes[1], currentRecipeIndex, JSON.parse(localStorage.getItem("bulkRecipes")));
}
if(event.target == document.getElementById("eat-me-button")) {
    console.log(event.target.dataset.recipeID);
    getSpecificRecipe(event.target.dataset.recipeID);
}
if(event.target == document.getElementById("wine-button")) {
    console.log("clicked it");
    displayWines(mainWindow.childNodes[2], JSON.parse(localStorage.getItem("chosenRecipe")));
}
if(event.target == document.getElementById("netflix-button")) {
    console.log("lets netflix");
}
})

pantrySaveEl.addEventListener('click', function(event){
  savePantry();
  console.log(pantry)
})

// Create a submit event listener on the form element
// handleFormSubmit(event));


// recipeSearch()
//initially low functionality that will be built out with options if time permits, generates description and input form for search term and button to submit
function recipeSearch() {
  //create a div row for the page description
  mainWindow.innerHTML = "";
  var newRow = document.createElement("div");
  newRow.classList = "row center-align";
  mainWindow.appendChild(newRow);
  var description = document.createElement("p");
  description.textContent =
    "Looks like you already have a recipe in mind that you would like to make for dinner! In that case, all you need to do is put the name of recipe you'd like to find in the field below and hit the Search button!";
  description.classList = "col s6 offset-s3";
  newRow.appendChild(description);

  //create a second div row for the inputform
  var secRow = document.createElement("div");
  secRow.classList = "row center-align";
  mainWindow.appendChild(secRow);

  //create a form element
  var inputForm = document.createElement("form");
  secRow.appendChild(inputForm);

  //create a text input field and add it to the form
  var inputField = document.createElement("div");
  inputField.classList = "input-field col s6 offset-s3";
  inputForm.appendChild(inputField);
  var textInput = document.createElement("input");
  textInput.type = "text";
  textInput.id = "recipeToSearch";
  textInput.classList = "validate";
  inputField.appendChild(textInput);

  //create a label for the text field and add it to the form
  var inputLabel = document.createElement("label");
  inputLabel.setAttribute("for", "recipeToSearch");
  inputLabel.textContent = "Find this recipe";
  inputField.appendChild(inputLabel);

  //create a button and add it to the input form
  var subBtn = document.createElement("button");
  subBtn.classList = "btn waves-effect waves-light col s6 offset-s3";
  subBtn.type = "submit";
  subBtn.setAttribute("id", "recipeSearchButton");
  subBtn.textContent = "Search";
  inputForm.appendChild(subBtn);
}

recipSchBtn.addEventListener("click", function(event){
  event.preventDefault();
  recipeSearch();
})


mainWindow.addEventListener("submit", function (event) {
  event.preventDefault();
  if(document.getElementById("recipe-search-btn")) {
  console.log(document.getElementById("recipe-search-btn").value);
  getRecipes(document.getElementById("recipe-search-btn").value);
}
if(document.getElementById("recipeSearchButton")) {
    console.log(document.getElementById("recipeToSearch").value);
    getRecipes(document.getElementById("recipeToSearch").value);
}

});
//getRecipes()
// calls spoonacular api for recipes based on key term search and returns object
function getRecipes(searchTerm) {
  fetch(
    `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${searchTerm}&number=20&offset=0`,
    {
      method: "GET",
      headers: {
        "x-rapidapi-key": "0f2b669cc5msh65b1d920849f4ebp157757jsnc5636ee97165",
        "x-rapidapi-host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    }
  )
    .then((response) => {

      //console.log(response.json());
      return response.json();
      //displayRecipes(response.json());
    }) .then((data) => {
        localStorage.setItem("bulkRecipes", JSON.stringify(data));
        displayRecipes(data, 0,  searchTerm);
    })
    .catch((err) => {
      console.error(err);
    });
}
// calls spoonacular api for recipes based on search by ingredients
function searchByIngredient(ingredientArray) {
  var ingredientString = "";
  for (let i = 0; i < ingredientArray.length; i++) {
    ingredientString += ingredientArray[i];
    if (i != ingredientArray.length - 1) {
      ingredientString += "%2C";
    }
  }
  console.log(ingredientString);
  fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=${ingredientString}&number=10&ranking=1&ignorePantry=true`, {
      "method": "GET",
      "headers": {
          "x-rapidapi-key": "0f2b669cc5msh65b1d920849f4ebp157757jsnc5636ee97165",
          "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
      }
  })
  .then(response => {
      return response.json();
  })
  .then((data) => {
    localStorage.setItem("bulkRecipes", JSON.stringify(data));
      displayRecipes(data, 0, ingredientString);
  })
  .catch(err => {
      console.error(err);
  });
}

function getSpecificRecipe(recipeID) {
    fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${recipeID}/information`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "0f2b669cc5msh65b1d920849f4ebp157757jsnc5636ee97165",
            "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
        }
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        localStorage.setItem("chosenRecipe", JSON.stringify(data));
        displayRecipeDetails(data);
    })
    .catch(err => {
        console.error(err);
    });

}
//searchByIngredient(["dogs","cats","lions","tigers","bears"-]);
//
// should be called used getRecipes() and searchByIngredients() , generates cards based on query data and displays image of recipe plus number of used and missing ingredients, clicking on card calls displayRecipeDetails()
function displayRecipes(dataObject, startIndex, searchTerm) {
mainWindow.innerHTML = "";

var newRow = document.createElement("div");
newRow.classList = "row center-align";
mainWindow.appendChild(newRow);
var description = document.createElement("h5");
description.textContent =
  `Here are the first five recipes for ${searchTerm}:`;
description.classList = "col s8 offset-s2";
newRow.appendChild(description);

//create a new row to place all of our cards on
var secRow = document.createElement("div");
secRow.classList = "row center-align";
mainWindow.appendChild(secRow);

console.log(dataObject);

generateCards(secRow, startIndex, dataObject);
//need to create a way to show the next five recipes on screen when they click this button
var moreRecipes = document.createElement("div");
moreRecipes.classList = "row";
mainWindow.appendChild(moreRecipes);
var nextSet = document.createElement("button");
nextSet.classList = "btn waves-effect waves-light col s6 offset-s3";
nextSet.type = "submit";
nextSet.setAttribute("id", "get-more-recipes");
nextSet.textContent = "More Recipes";
nextSet.dataset.recipe= searchTerm;
moreRecipes.appendChild(nextSet);
}

//moved this for loop outside of the displayRecipes functions and made its own function in order to be able to call to generate more recipe cards
function generateCards(theParent, startHere, dataObject) {
    if(startHere <= 15) {
    theParent.innerHTML = "";
for(let i = startHere; i < (startHere+5); i++) {
    //debugger;
    var colDiv = document.createElement("div");
    colDiv.classList= "col s6 m4 l2";
    theParent.appendChild(colDiv);
    var cardDiv = document.createElement("div");
    cardDiv.classList = "card";
    colDiv.appendChild(cardDiv);
    var imgDiv = document.createElement("div");
    imgDiv.classList = "card-image";
    cardDiv.appendChild(imgDiv);
    var image = document.createElement("img");
    image.src = `https://spoonacular.com/recipeImages/${dataObject.results[i].id}-480x360.jpg`;
    imgDiv.appendChild(image);
    var cardTitle = document.createElement("h4");
    cardTitle.classList = "card-title";
    //cardTitle.style = "font-size:20px";
    cardTitle.textContent= `${dataObject.results[i].title}`;
    cardDiv.appendChild(cardTitle);
    var contentDiv = document.createElement("div");
    contentDiv.classList = "card-content";
    cardDiv.appendChild(contentDiv);
    var servings = document.createElement("p");
    servings.textContent = `Servings: ${dataObject.results[i].servings}`;
    contentDiv.appendChild(servings);
    var minReady = document.createElement("p");
    minReady.textContent = `Ready in : ${dataObject.results[i].readyInMinutes} Minutes`;
    contentDiv.appendChild(minReady);

    var addBtn = document.createElement("button");
    addBtn.classList = "btn-floating halfway-fab waves-effect waves-light green";
    addBtn.dataset.recipeID = dataObject.results[i].id;
    addBtn.id = "eat-me-button";
    addBtn.innerHTML = `eat`;
    imgDiv.appendChild(addBtn);   
}
currentRecipeIndex+=5;
}}

//getRecipes("Lasagna");
//displayRecipes();
//displayRecipeDetails()
// generates more detailed description of recipe with image, ingredient lists, and instructions, button with option to open the recipe page in a new window. should also create description for the wine pairing feature with an input field for wine budget and buttons to get wine or skip

function displayRecipeDetails(dataObject) {
    console.log(dataObject);
    mainWindow.innerHTML = "";

    //create a new row to house the recipe name
    var newRow = document.createElement("div");
    newRow.classList = "row center-align";
    mainWindow.appendChild(newRow);
    var description = document.createElement("h4");
    description.textContent =
      `${dataObject.title}`;
    description.classList = "col s8 offset-s2";
    newRow.appendChild(description);

    //create a new row to house the recipe image and, cuisine type, diets
    var secRow = document.createElement("div");
    secRow.classList = "row center-align";
    mainWindow.appendChild(secRow);

    // add the recipe image
    var imageCol = document.createElement("img");
    imageCol.classList = "col s6";
    imageCol.src = dataObject.image;
    secRow.appendChild(imageCol);

    // add a column and add a bunch of details details
    var descCol = document.createElement("div");
    descCol.classList = "col s6";
    secRow.appendChild(descCol);

    var vegan = document.createElement("p");
    if(dataObject.vegan) {
        vegan.textContent = "This dish IS Vegan";
    }else {
        vegan.textContent = "This dish is NOT Vegan";
    }
    descCol.appendChild(vegan);

    var vegetarian = document.createElement("p");
    if(dataObject.vegetarian) {
        vegetarian.textContent = "This dish IS Vegetarian";
    }else {
        vegetarian.textContent = "This dish is NOT Vegetarian";
    }
    descCol.appendChild(vegetarian);

    var glutenFree = document.createElement("p");
    if(dataObject.glutenFree) {
        glutenFree.textContent = "This dish IS Gluten Free";
    }else {
        glutenFree.textContent = "This dish is NOT Gluten Free";
    }
    descCol.appendChild(glutenFree);

    var dairyFree = document.createElement("p");
    if(dataObject.dairyFree) {
        dairyFree.textContent = "This dish IS Dairy Free";
    } else {
        dairyFree.textContent = "This dish is NOT Dairy Free";
    }
    descCol.appendChild(dairyFree);

    var fullRecipes = document.createElement("p");
    fullRecipes.innerHTML = `Full Recipe can be found at: <a href=${dataObject.sourceUrl} target="_blank">${dataObject.sourceName}</a>`;
    descCol.appendChild(fullRecipes);
    var thirdRow = document.createElement("div");
    thirdRow.classList = "row center-align";
    mainWindow.appendChild(thirdRow);

    var summary = document.createElement("p");
    summary.classList = "col s12";
    summary.innerHTML = `${dataObject.summary}`;
    thirdRow.appendChild(summary);

    //create a fourth row for our wine pairing and to move on to netflix section
    var fourthRow = document.createElement("div");
    fourthRow.classList = "row center-align";
    mainWindow.appendChild(fourthRow);

    //create a button to show wine pairing information
    var wineBtn = document.createElement("button");
    wineBtn.classList = "waves-effect waves-light btn col s5";
    wineBtn.id = "wine-button";
    wineBtn.textContent="Wine Pairings";
    fourthRow.appendChild(wineBtn);

    var netflixBtn = document.createElement("button");
    netflixBtn.classList = "waves-effect waves-light btn col s5 offset-s2";
    netflixBtn.id = "netflix-button";
    netflixBtn.textContent = "Find a Movie";
    fourthRow.appendChild(netflixBtn);
}
//displayRecipeDetails(JSON.parse(localStorage.getItem("chosenRecipe")));


function displayWines(parentEl, dataObject) {
parentEl.innerHTML = "";
var wineHeader = document.createElement("h5");
wineHeader.textContent= "Suggest Wine Pairings";
parentEl.appendChild(wineHeader);

if(dataObject.winePairing.pairedWines){
var ulEl = document.createElement("ul");
parentEl.appendChild(ulEl);
for(let i = 0; i <dataObject.winePairing.pairedWines.length; i++) {
    var listItemEl = document.createElement("li");
    listItemEl.textContent = dataObject.winePairing.pairedWines[i].charAt(0).toUpperCase() +dataObject.winePairing.pairedWines[i].slice(1) ;
    ulEl.appendChild(listItemEl);
}
var description = document.createElement("p");
description.textContent = dataObject.winePairing.pairingText;
parentEl.appendChild(description);
} else {
    var description = document.createElement("p");
    description.textContent = "We're terribly sorry, we don't have any saved wine pairings for this recipe.";
    parentEl.appendChild(description);
}
}
//displayWines()
// generates a list of possible wine pairings from wineobject with description of pairing choices. generates card(s) with product matches that contain an image, wine rating, and wine price. clicking on card creates modal with description of wine and button to select it

//generateNetflixForm()
//generates a description of our netflix search criteria and how to utilize the input form. generates form with multiple inputs for Release dates, minimum IMDB rating, actor, move or series toggle, keywords, and genre selector

//getNetflixResults()
//generates apiurl from user inputs, validates and saves returned object, calls displayNetflixResults

//displayNetflixResults()
//generates cards with image, movie title, year of release, and imdb rating. clicking on cards creates modal with movie synopsis and button to confirm selection. generates a button below the cards that allows the user to move on to the next set of 5 search results. another button allows the user to return to the netflixForm to start their search over.

//summarizeEvening()
// the final page generates a summary of the dinner, wine, and netflix selections that the user has made so far. clicking on a section provides an overview/summary of the specific option the user selected. button at bottom of the screen returns user to homepage to start over.

