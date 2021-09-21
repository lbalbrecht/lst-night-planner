# Quarantine and Chill

## Description

This application allows users to plan for a night in with dinner and a movie. The application uses Spoonacular API as well as the Unnoficial Netflix online Global Search (uNoGS) API to provide recipes and movie recommendations based on specific criteria. 

[Deployed on Github Pages](https://lbalbrecht.github.io/lst-night-planner/)

## Usage

Upon launch, the user will land on the homepage, providing a description of the application and the option to search for specific recipes or find meals using ingredients.

![Quarantine and Chill homepage](./assets/images/homepage.png?raw=true)

If the user chooses "Search for meals," they will be taken to the recipe search screen. Here, the user will input the name of a specific dish. The API Spoonacular will pull up a list of recipes that match the user's input 

![Recipe search screen](./assets/images/find-recipe.png?raw=true)

When the user clicks the search button, Spoonacular will pull up five recipes that match the user's search.

![Recipe results page](./assets/images/recipe-results.png?raw=true)

If the user chooses "Search using ingredients," they will be taken to the ingredient search page. From here, the user may add all of the ingredients they wish to use in their recipe. This function allows users to use what they have in their fridge without necessarily having to go to the grocery store to buy more food. In the future, we would like to implement the "maximize" and "minimize" functions to allow the user to choose whether or not they want the recipes to contain the most ingredients on their list or just a single ingredient

![Ingredient search screen](./assets/images/add-ingredients.png?raw=true)

Similarly to the recpie search, when the user clicks the search button, Spoonacular will pull up five recipes using the ingredients that the user entered.

![Ingredient results screen](./assets/images/ingredient-results.png?raw=true)

If the user wishes to restart their recipe search from the landing page, they may click the "Dinner" button on the top righthand corner of the page.

If the user wishes to view more recipes, they may click the "More Recipes" button; otherwise, they may click the "eat" button on the recipe card to add that recipe to their night. When the user selects a recipe they will be presented with the recipe information screen. The information screen indicates whether the recipe meets certain dietary restrictions (vegan, vegetarian, gluten-free, dairy-free) as indicated by Spoonacular. The screen also gives a brief description of the recipe which may include nutritional information, reviews, additional ingredients, an overall Spoonacular score, and similar recipes.

![Recipe information page](./assets/images/recipe-info.png?raw=true)

If the user wishes, they may click the "wine pairings button" to see what wines, if any, Spoonacular recommends to pair with the recipe. Not all recipes include a wine pairing.

![Wine pairing description](.assets/images/wine-pairing.png?raw=true)

Once the user has chosen a recipe to add to their evening, they may click the "find a movie" button to search for a movie on Netflix. Additionally, they may click the "Movie" button located at the top righthand corner at any point. When the user selects movie, they will be directed to the movie search page. The user may search for movies within a specific timeframe, by actor, keyword, or by IMDB rating. Additionally,  the option to switch between a movie and a TV series is also available.

![Movie search screen](./assets/images/movie-search.png?raw=true)

Upon searching, the API uNoGS (Unofficial Netflix online Global Search) will provide the user with four movies that meet the search criteria. At present, the searches do continain non-English results. Future development includes a language filter to the search as well as explorations into other APIs that may include results for other streaming services.

![Movie results screen](./assets/images/movie-results.png?raw=true)

Once the user has chosen a recipe and a movie, they will be presented with a summary of their evening.

![Night summary screen](./assets/images/night-summary.png?raw=true)

## Contributors

* Leighton Albrecht
* Trevor Eckberg
* Sung Kim

[View Github Repository](https://github.com/lbalbrecht/lst-night-planner)
