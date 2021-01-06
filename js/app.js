$(document).ready(() => {
  $('#searchForm').on('submit',  (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies (searchText){
  axios.get('http://www.omdbapi.com?apikey=ef86e5b8&s=' +searchText)
  .then((response) => {
    console.log(response);
    let movies = response.data.Search;
    let output = ' ';
    $.each (movies, (index, movie) => {
      output += `
      <div class="col-md-3">
      <div class="well text-center">
      <img src="${movie.Poster}">
      <h5>${movie.Title}</h5>
      <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Apie filmą</a>
      </div>
      </div>
      `;
    });

    $('#movies').html(output);
  })
  .catch((err) => {
    console.log(err);
  });
}

function movieSelected (id){
  sessionStorage.setItem('movieId', id);
  window.location = 'index.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  axios.get('http://www.omdbapi.com?apikey=ef86e5b8&i=' +movieId)
  .then((response) => {
    console.log(response);
    let movie = response.data;

    let output = `
    <div class="row">
    <div class="col-md-4">
    <img src="${movie.Poster}" class= "thumbnail image">
    </div>
    <div class="col-md-8">
    <h2>${movie.Title}</h2>
    <ul class="list-group">
    <li class= "list-group-item"><strong>Žanras:</strong> ${movie.Genre}</li>
    <li class= "list-group-item"><strong>Išleista:</strong> ${movie.Released}</li>
    <li class= "list-group-item"><strong>IMBD Ratingas:</strong> ${movie.imdbRating}</li>
    <li class= "list-group-item"><strong>Filmo trukmė:</strong> ${movie.Runtime}</li>
    <li class= "list-group-item"><strong>Išleidimo šalis:</strong> ${movie.Country}</li>
    <li class= "list-group-item"><strong>Režisierius:</strong> ${movie.Director}</li>
    <li class= "list-group-item"><strong>Rašytojas:</strong> ${movie.Writer}</li>
    <li class= "list-group-item"><strong>Aktoriai:</strong> ${movie.Actors}</li>
    </ul>
    </div>
    </div>
    <div class="well">
    <h3>Aprašymas</h3>
    ${movie.Plot}
    <hr>
    <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class ="btn btn-primary"> Daugiau apie filmą</a>
    <a href="pagrindinis.html" class="btn btn-primary">Gryžti atgal į paiešką</a>
    </div>
    `;
    $('#movie').html(output);

  })
  .catch((err) => {
    console.log(err);
  });
}
