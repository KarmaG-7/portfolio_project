show_LandingPage_Movies();

const api_key = "api_key=c1e61490b0c87d5ef43523f95c96b957";
const form = document.querySelector("form")


const section = document.querySelector(".allmovies")

form.addEventListener("submit",(event) =>{
    event.preventDefault();

    section.innerHTML = "";
    const {movie} = event.target
    if(movie.value.trim() === ""){
        alert("Name of the movie can't be empty!");
        window.location.href = 'index.html';
    }

    fetch(`https://api.themoviedb.org/3/search/movie?${api_key}&language=en-US&page=1&include_adult=false&query=${movie.value}`)
    .then((apiData) => apiData.json())
    .then((actualData) => {
        console.log(actualData)
        top20_Movies(actualData.results)       
    })
    .then((error) =>{
        console.log(error)
    })

    form.reset();   
})


function  show_LandingPage_Movies(){

    const api_key = "api_key=c1e61490b0c87d5ef43523f95c96b957";
    fetch(`https://api.themoviedb.org/3/movie/popular?${api_key}&language=en-US&page=1`)
    .then((apiData) => apiData.json())
    .then((actualData) => {
        console.log(actualData)
        top20_Movies(actualData.results)  
   
    })
}


function top20_Movies(movies){
    const section = document.querySelector(".allmovies")
    for(i=0;i<movies.length; i++){
        const movie_title = movies[i].original_title
        const movie_rating = movies[i].vote_average.toFixed(1)
        const poster = movies[i].backdrop_path
        const released_date = movies[i].release_date.slice(0,4)
        const id = movies[i].id;
        const noImageSrc = "images/picNotAvailable.png"

        const div = document.createElement("div");
        div.classList.add("movie_list");

        const img = document.createElement("img");
        const a = document.createElement("a")
        a.classList.add("poster")
        a.setAttribute('href' ,`index2.html?id=${id}`);
        
        div.innerHTML = `<div class="name"> ${movie_title}
            <span class="rating">${movie_rating}</span> </div> 
        <div class="released_date">${released_date} </div>`

        section.append(div)
       

        if(poster === null){
            img.setAttribute("src", `${noImageSrc}`) 
            img.setAttribute("alt" , movie_title)  
            a.append(img);
            div.prepend(a)
        }

        else{
            img.setAttribute("src", `https://image.tmdb.org/t/p/w500/${poster}`) 
            img.setAttribute("alt" , movie_title)  
            a.append(img);
            div.prepend(a)
        }
    }    
}

