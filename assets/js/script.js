var mainWindow = document.querySelector("#landing-page");
var searchByRecipes = document.querySelector("#recipeToSearch");
var searchRecBtn = document.querySelector("#input-field");
var recipSchBtn = document.querySelector("#recipe-search-btn")
var ingredSchBtn = document.querySelector("#ingredient-search-btn")
var ingredientSearch = document.querySelector("#ingredient-search")

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
var pantry = [];

// document.addEventListener('DOMContentLoaded', function() {
//   var elems = document.querySelectorAll('.chips');
//   var instances = M.Chips.init(elems, data);
// });

// function to handle form submission
ingredientBtnEl.addEventListener('click', function(event){

  event.preventDefault();

  var ingredient = pantryFormEl.value;
  console.log(pantryFormEl.value);

  if (!ingredient) {
    console.log('No shopping item filled out in form!');
    return;
  }

  var listItemEl = document.createElement("li");
  listItemEl.textContent = ingredient;

  // var deleteBtnEl = document.createElement("button");

  // deleteBtnEl.textContent = "x";

  // deleteBtnEl.addEventListener("click", function(event){
  //   event.preventDefault();
  //   pantryListEl.removeChild(listItemEl);
  //   pantry.splice(pantry.indexOf[listItemEl])
  //   console.log(pantry)
  // })

  // listItemEl.appendChild(deleteBtnEl);

  pantryListEl.appendChild(listItemEl);

  pantry.push(ingredient);

pantryFormEl.value = ('');

console.log(pantry)

savePantry();

})



// Create a submit event listener on the form element
// handleFormSubmit(event));


// // recipeSearch()
// //initially low functionality that will be built out with options if time permits, generates description and input form for search term and button to submit
// function recipeSearch() {
//     //create a div row for the page description
//     mainWindow.innerHTML="";
//   var newRow = document.createElement("div");
//   newRow.classList = "row center-align";
//   mainWindow.appendChild(newRow);
//   var description = document.createElement("p");
//   description.textContent =
//     "Looks like you already have a recipe in mind that you would like to make for dinner! In that case, all you need to do is put the name of recipe you'd like to find in the field below and hit the Search button!";
//   description.classList = "col s6 offset-s3";
//   newRow.appendChild(description);

//   //create a second div row for the inputform
//   var secRow = document.createElement("div");
//   secRow.classList = "row center-align";
//   mainWindow.appendChild(secRow);

//   //create a form element
//   var inputForm = document.createElement("form");
//   secRow.appendChild(inputForm);

//   //create a text input field and add it to the form
//   var inputField = document.createElement("div");
//   inputField.classList = "input-field col s6 offset-s3";
//   inputForm.appendChild(inputField);
//   var textInput = document.createElement("input");
//   textInput.type = "text";
//   textInput.id = "recipeToSearch";
//   textInput.classList = "validate";
//   inputField.appendChild(textInput);

// //create a label for the text field and add it to the form
//   var inputLabel = document.createElement("label");
//   inputLabel.setAttribute("for", "recipeToSearch");
//   inputLabel.textContent = "Find this recipe";
//   inputField.appendChild(inputLabel);

//   //create a button and add it to the input form
//   var subBtn = document.createElement("button");
//   subBtn.classList = "btn waves-effect waves-light col s6 offset-s3";
//   subBtn.type = "submit";
//   subBtn.setAttribute("id", "recipeSearchButton");
//   subBtn.textContent = "Search";
//   inputForm.appendChild(subBtn);
// }

// recipeSearch();

// mainWindow.addEventListener("submit", function (event) {
//   event.preventDefault();
  
//   console.log(document.getElementById("recipeToSearch").value);
//   getRecipes(document.getElementById("recipeToSearch").value);
// });
// //getRecipes()
// // calls spoonacular api for recipes based on key term search and returns object
// function getRecipes(searchTerm) {

//     fetch(`https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?query=${searchTerm}&number=10&offset=0`, {
//         "method": "GET",
//         "headers": {
//             "x-rapidapi-key": "0f2b669cc5msh65b1d920849f4ebp157757jsnc5636ee97165",
//             "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com"
//         }
//     })
//     .then(response => {
//         console.log(response.json());
//         //return response.json();
//         //displayRecipes(response.json());
//     })
//     .catch(err => {
//         console.error(err);
//     });

// }
// // searchByIngredient()
// // calls spoonacular api for recipes based on search by ingredients

// //displayRecipes()
// // should be called used getRecipes() and searchByIngredients() , generates cards based on query data and displays image of recipe plus number of used and missing ingredients, clicking on card calls displayRecipeDetails()



// //displayRecipeDetails()
// // generates more detailed description of recipe with image, ingredient lists, and instructions, button with option to open the recipe page in a new window. should also create description for the wine pairing feature with an input field for wine budget and buttons to get wine or skip

// //getWines()
// //creates apiurl from user input, validates and saves returned object, calls display wine function

// //displayWines()
// // generates a list of possible wine pairings from wineobject with description of pairing choices. generates card(s) with product matches that contain an image, wine rating, and wine price. clicking on card creates modal with description of wine and button to select it

// //generateNetflixForm()
// //generates a description of our netflix search criteria and how to utilize the input form. generates form with multiple inputs for Release dates, minimum IMDB rating, actor, move or series toggle, keywords, and genre selector

// //getNetflixResults()
// //generates apiurl from user inputs, validates and saves returned object, calls displayNetflixResults

// //displayNetflixResults()
// //generates cards with image, movie title, year of release, and imdb rating. clicking on cards creates modal with movie synopsis and button to confirm selection. generates a button below the cards that allows the user to move on to the next set of 5 search results. another button allows the user to return to the netflixForm to start their search over.

// //summarizeEvening()
// // the final page generates a summary of the dinner, wine, and netflix selections that the user has made so far. clicking on a section provides an overview/summary of the specific option the user selected. button at bottom of the screen returns user to homepage to start over.
