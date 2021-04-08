var NetflixList;
var mainwindow = document.getElementById("main-window");  //chooses where to show where the results of the netflix section

function generateNetflixform() {  //creates the initial landing page for the netflix module.  Generates a form for the user to narrow their criteria.
var tempText = `
<div class="col s12 m10 center-align" id="header">
<h5>Welcome to Quarantine and Chill!</5>
    <div class="card-panel" id="landing-page">

There are a bunch of different ways we can help you find something to watch on Netflix! In the form below, enter all the criteria you want met and we'll do the rest; or you can leave it empty.
<form id="netflixForm">
    <p class="col s4">
        <input id="StartYear" type="number" value="1990" min="1960" max="2021" oninput="this.nextElementSibling.value = this.value">
        <label for="StartYear">Starting Year</label>
    </p>
    <p class="col s4">
        <input id="EndYear" type="number" value="2021" min="1960" max="2021" oninput="this.nextElementSibling.value = this.value">
        <label for="EndYear">End Year</label>
    </p>
    <div class="row">
        <div class="input-field col s5">
            <input id="Actor" type="text" class="validate">
            <label for="Actor">Actor</label>
        </div>
        <div class="input-field col s5">
            <input id="Keyword" type="text" class="validate">
            <label for="Keyword">Keyword</label>
    </div>
    <div class="input-field col s2">
        <input id="netflix-imdb" type="text" class="validate">
        <label for="netflix-imdb">IMDB rating</label>
      </div>                  
    </div>
    <div class="switch" onclick="changeMorS()">
        <label>
          Movie
          <input type="checkbox" id="MorS">
          <span class="lever"></span>
          Series
        </label>
    </div>
    <div class="row">
        <p>
            <a class="waves-effect waves-light btn" onclick="getNetflixResults()">submit</a>
        </p>
    </div>
</div>
</form>
</div>

</div>
</div>
`
    mainwindow.innerHTML = tempText;  //populates the section with all the Netflix HTML code entered into tempText
}

function getNetflixResults() {  //curates the search form results and makes them query friendly and checks for minor issues
var DateAfter = document.querySelector('#StartYear').value;
var DateBefore = document.querySelector('#EndYear').value;
var Genre = "";  //discovered this is very difficult to implement and having issues with materialize CSS so defaulting to nothing
var IMDBscore = document.querySelector('#netflix-imdb').value;
var ActorName = document.querySelector('#Actor').value;
var MorS = document.querySelector('#MorS').checked; 
var Keyword = document.querySelector('#Keyword').value;

if (IMDBscore != "") {    IMDBscore = `&start_rating=`+IMDBscore;}
if (Genre != "")     {    Genre = `&genrelist=`+Genre;}
Keyword = Keyword + ` `+ ActorName;
if (Keyword != " ")   {    Keyword = `&query=`+Keyword;} else { Keyword="";}
if (MorS == false) {MorS = "&type=movie";} else MorS = "&type=series"

//verify in console.log that the data is showing up accurately.
console.log(`date start: `+DateAfter); 
console.log(`date before: `+DateBefore); 
console.log(`genre: `+Genre); 
console.log(`IMDBscore: `+IMDBscore);
console.log(`Type: `+MorS);
console.log(`Actor: `+ActorName); 
console.log(`Keyword: `+Keyword); 

queryNetflix(DateBefore, DateAfter, Genre, IMDBscore, ActorName, MorS, Keyword);  //with all the search fields cleaned up, we call the API and populate our array
}

function queryNetflix (DateBefore, DateAfter, Genre, IMDBscore, ActorName, MorS, Keyword) {  //query the Unogsng API with the set criteria.  If left blank, it will search for default results.

// var defaultSearch = "https://unogsng.p.rapidapi.com/search?type=movie&start_year=1972&orderby=rating&audiosubtitle_andor=and&start_rating=5&limit=100&subtitle=english&countrylist=78%2C46&audio=english&country_andorunique=unique&offset=0&end_year=2019";

  var defaultSearch = `https://unogsng.p.rapidapi.com/search?start_year=`+DateAfter+`&orderby=rating&limit=100&subtitle=english&countrylist=46&offset=0&end_year=`+DateBefore+IMDBscore+MorS+Keyword;
  console.log(defaultSearch);

//  var defaultSearch = `https://unogsng.p.rapidapi.com/search?start_year=`+DateAfter+`&orderby=rating&limit=100&countrylist=78%2C46&audio=english&country_andorunique=unique&offset=0&end_year=`+DateBefore;

fetch (defaultSearch, {
    "method": "GET",
	"headers": {
		"x-rapidapi-key": "a3445dbd0cmsh7af0cb91bca3b74p172133jsnf8edb8b3b778",
		"x-rapidapi-host": "unogsng.p.rapidapi.com"
	}
})
.then(response => {
    return response.json();
})
.then(function (movieDat) {
    console.log(movieDat);
    NetflixList=[];
    for (var i = 0; i < movieDat.results.length; i++) {
        var movie = {
            "title":movieDat.results[i].title,
            "image":movieDat.results[i].poster,
            "nfid":movieDat.results[i].nfid,
            "year":`(`+movieDat.results[i].year+`)`,
            "IMDB":movieDat.results[i].imdbrating,
            "runtime":movieDat.results[i].runtime,
            "syn": movieDat.results[i].synopsis
        }
        if(movie.runtime == 0) {
            movie.runtime = "-"
        } else {
            movie.runtime=Math.round(movie.runtime / 60);
            movie.runtime+="min";
        }
        if (movie.image == "") {movie.image="http://via.placeholder.com/200x300.png?text=No+poster+available"}
        NetflixList.push(movie);
    }
    console.log(NetflixList);
    generateNetflixShow("", NetflixList, -1);
})
.catch(err => {
	console.error(err);
});
}

function changeMorS () {  //this function checks to see if the switch to toggle between movies/series is checked.
    var MorS = document.querySelector('#MorS'); 

    if (MorS.checked == true) {MorS.checked = false} else MorS.checked = true;
    console.log(MorS.checked);
}

function replaceImage(imageID) {
    $(imageID).attr("src", "http://via.placeholder.com/200x300.png?text=No+poster+available");
    console.log("changed picture from null");
}

function generateNetflixShow(event, NetflixList, varStart) {  //this function generates cards to display the netflix results.  The NetflixList is an array with all the info.  varStart is the index starting point to display 4 results.
    if (event) {
        event.preventDefault();
    }
    var tempText = `
    <div class="row flow-text">
`

var curI;
    console.log(NetflixList);
    for (var i=1; i<5; i++) {
      curI = varStart+i;
      if (curI < NetflixList.length) {
        
        tempText += `
   <div class="card col netflix s3">
   <div class="card-image waves-effect waves-block waves-light">
   <img class="activator" src="`+NetflixList[curI].image+`" onerror="replaceImage('#img-`+curI+`')" id="img-`+curI+`">
   </div>
   <div class="card-content">
     <span class="card-title activator grey-text text-darken-4"><i class="material-icons right">more_vert</i>`+NetflixList[curI].title+`</span>
   </div>
   <div class="save">
    year: `+NetflixList[curI].year+` [`+NetflixList[curI].IMDB+`/10]
    <span class="right-align"><p><a href="#" onclick="saveNetflix(`+curI+`)">SAVE</a></span>
   </div>
   <div class="card-reveal">
     <span class="card-title grey-text text-darken-4">`+NetflixList[curI].title+`<i class="material-icons right">close</i></span>
     <p id="card4-runtime">runtime: `+NetflixList[curI].runtime+`</p>
     <p id="card4-syn">`+NetflixList[curI].syn+`</p>
   </div>
</div>
    `
        }
    }

  var backI = curI-8;
  tempText += `</div><div class="align-bottom height:50px;"><p>`;
  if (backI >= -1) {  //checks to see if the back button should be created
    tempText += `[ <a href="" onclick="generateNetflixShow(event,NetflixList,`+backI+`)">back</a> ]`;
  }
  if (curI+1 < NetflixList.length) {  //checks to see if there are more results needed to be shown
    tempText += `[ <a href="" onclick="generateNetflixShow(event,NetflixList,`+curI+`)">forward</a> ]`;
  }
  tempText += `</div>`;
  mainwindow.innerHTML = tempText;
}

function saveNetflix(curI) {  // once the user clicks the SAVE button, determines what happens to the Netflix ID chosen.
    console.log(NetflixList[curI]+` was chosen`);
    localStorage.setItem("chosenMovie", JSON.stringify(NetflixList[curI])); //saves the chosen movie to localstorage
    summarizeEvening();
}