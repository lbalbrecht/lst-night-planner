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

// thePantryPage()
// generates a description of the pantry page and how it functions, includes input form for ingredients, calls savePantry on submission and Update Pantry to populate items

// savePantry()
// allows the user to add food items to their pantry list and save them to local storage


// updatePantry()  and removeItem()??
//updates/generates the list of user pantry items on screen, also used to remove items from the list

// recipeSearch()
//initially low functionality that will be built out with options if time permits, generates description and input form for search term and button to submit

//getRecipes()
// calls spoonacular api for recipes based on key term search and returns object

// searchByIngredient()
// calls spoonacular api for recipes based on search by ingredients

//displayRecipes()
// should be called used getRecipes() and searchByIngredients() , generates cards based on query data and displays image of recipe plus number of used and missing ingredients, clicking on card calls displayRecipeDetails()

//displayRecipeDetails()
// generates more detailed description of recipe with image, ingredient lists, and instructions, button with option to open the recipe page in a new window. should also create description for the wine pairing feature with an input field for wine budget and buttons to get wine or skip

//getWines()
//creates apiurl from user input, validates and saves returned object, calls display wine function

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
