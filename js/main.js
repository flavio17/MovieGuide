let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

//função para pegar os dados do filme
let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
  // se o campo do nome do filme estiver vazio
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Digite o nome do filme!</h3>`;
  } else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        if (data.Response == "True") {
          result.innerHTML = `
            <div class="info">
              <img src=${data.Poster} class="poster" />
              <div>
                <h2 class="title">${data.Title}</h2>

                <div class="rating">
                  <img src="../images/star-icon.svg" />
                  <h4>${data.imdbRating}</h4>
                </div>

                <div class="details">
                  <span>${data.Rated}</span>
                  <span>${data.Year}</span>
                  <span>${data.Runtime}</span>
                </div>

                <div class="genre">
                  <div>${data.Genre.split(",").join("</div><div>")}</div>
                </div>
              </div> 
              </div> 
              <h3>Trama: </h3>
              <p>${data.Plot}</p>
              <h3>Elenco</h3>
              <p>${data.Actors}</p>
          
          `;
          // se o filme não existir na base de dados
        } else {
          result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
        }
      })
      // se ocorrer erros na requisição
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Erro ao buscar os dados do filme no banco de dados. :(</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
