var NetflixList;
var mainwindow = document.getElementById("landing-page")


function generateNetflixform() {
var tempText = `
There are a bunch of different ways we can help you find something to watch on Netflix! In the form below, enter all the criteria you want met and we'll do the rest; or you can leave it blank and we'll pick a few random titles for you if you leave everything blank.
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

    <!-- <div class="input-field col s12">
        <select>
          <option value="" disabled selected>Choose your option</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
          <option value="3">Option 3</option>
        </select>
        <label>Genre</label>
    </div> -->
    <div class="row">
        <p>
            <a class="waves-effect waves-light btn" onclick="getNetflixResults()">submit</a>
        </p>
    </div>
</div>
</form>
</div>
`
    mainwindow.innerHTML = tempText;
}

function getNetflixResults() {
var DateAfter = document.querySelector('#StartYear').value;
var DateBefore = document.querySelector('#EndYear').value;
var Genre = "";
var IMDBscore = document.querySelector('#netflix-imdb').value;
var ActorName = document.querySelector('#Actor').value;
var MorS = document.querySelector('#MorS').checked; 
var Keyword = document.querySelector('#Keyword').value;

if (IMDBscore != "") {    IMDBscore = `&start_rating=`+IMDBscore;}
if (Genre != "")     {    Genre = `&genrelist=`+Genre;}
Keyword = Keyword + ` `+ ActorName;
if (Keyword != " ")   {    Keyword = `&query=`+Keyword;} else { Keyword="";}
if (MorS == false) {MorS = "&type=movie";} else MorS = "&type=series"


console.log(`date start: `+DateAfter); 
console.log(`date before: `+DateBefore); 
console.log(`genre: `+Genre); 
console.log(`IMDBscore: `+IMDBscore);
console.log(`Type: `+MorS);
console.log(`Actor: `+ActorName); 
console.log(`Keyword: `+Keyword); 

queryNetflix(DateBefore, DateAfter, Genre, IMDBscore, ActorName, MorS, Keyword);
}

function queryNetflix (DateBefore, DateAfter, Genre, IMDBscore, ActorName, MorS, Keyword) {

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

function changeMorS () {
    var MorS = document.querySelector('#MorS'); 

    if (MorS.checked == true) {MorS.checked = false} else MorS.checked = true;
    console.log(MorS.checked);
}

function generateNetflixShow(event, NetflixList, varStart) {
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
   <img class="activator" src="`+NetflixList[curI].image+`">
   </div>
   <div class="card-content">
     <span class="card-title activator grey-text text-darken-4"><i class="material-icons right">more_vert</i>`+NetflixList[curI].title+`</span>
   </div>
   <div class="save">
    year: `+NetflixList[curI].year+` [`+NetflixList[curI].IMDB+`/10]
    <span class="right-align"><p><a href="#" onclick="saveNetflix(`+NetflixList[curI].nfid+`)">SAVE</a></span>
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
  if (backI >= -1) {
    tempText += `[ <a href="" onclick="generateNetflixShow(event,NetflixList,`+backI+`)">back</a> ]`;
  }
  if (curI+1 < NetflixList.length) {
    tempText += `[ <a href="" onclick="generateNetflixShow(event,NetflixList,`+curI+`)">forward</a> ]`;
  }
  tempText += `</div>`;
  mainwindow.innerHTML = tempText;
}

// function displayNetflixResults(NetflixList, varStart) {

//     for(var i = 0; i < 5; i++) {
//        $(`#card`+i+`-title`).text(NetflixList[i].title); //card1-title
//        $(`#card`+i+`-Dtitle`).text(NetflixList[i].title); //card1-title
//        $(`#card`+i+`-image`).attr("src", NetflixList[i].image); //card1-image
//        $(`#card`+i+`-year`).text(NetflixList[i].year); //card0-year
//        $(`#card`+i+`-syn`).text(NetflixList[i].syn); //card0-syn
//        $(`#card`+i+`-IMDB`).text(NetflixList[i].IMDB); //card0-IMDB
//        $(`#card`+i+`-runtime`).text(NetflixList[i].runtime); //card0-runtime
//        $(`#card`+i+`-runtime`).attr("onclick", `saveNetflix(`+NetflixList[i].nfid+`)`); //card0-runtime
//     }
// }

function saveNetflix(nfid) {
    console.log(nfid+` was chosen`)
}
