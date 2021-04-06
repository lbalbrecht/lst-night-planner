var NetflixList;
fetch("https://unogsng.p.rapidapi.com/search?start_year=1972&orderby=rating&audiosubtitle_andor=and&limit=100&subtitle=english&countrylist=78%2C46&audio=english&country_andorunique=unique&offset=0&end_year=2019", {
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
        NetflixList.push(movie);
    }
    console.log(NetflixList);
    displayNetflix(NetflixList, 0);
})
.catch(err => {
	console.error(err);
});

function displayNetflix(NetflixList, varStart, varEnd) {

    for(var i = 0; i < 5; i++) {
       $(`#card`+i+`-title`).text(NetflixList[i].title); //card1-title
       $(`#card`+i+`-Dtitle`).text(NetflixList[i].title); //card1-title
       $(`#card`+i+`-image`).attr("src", NetflixList[i].image); //card1-image
       $(`#card`+i+`-year`).text(NetflixList[i].year); //card0-year
       $(`#card`+i+`-syn`).text(NetflixList[i].syn); //card0-syn
       $(`#card`+i+`-IMDB`).text(NetflixList[i].IMDB); //card0-IMDB
       $(`#card`+i+`-runtime`).text(NetflixList[i].runtime); //card0-runtime
    }
}