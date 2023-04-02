//store the string in a searchbar of landing page into a variable
const searchParam = new URLSearchParams(window.location.search);
const movieId = searchParam.get("id");
const api_key = "c1e61490b0c87d5ef43523f95c96b957";

fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${api_key}&language=en-US`)
.then(apiData => apiData.json())
.then(actualData => {
    console.log(actualData)
    const overview = actualData.overview;
    const title = actualData.original_title;
    const revenue = actualData.revenue;
    const budget = actualData.budget
    const poster = actualData.poster_path

    const noImageSrc = "images/picNotAvailable.png"
    const img = document.createElement("img");
    const image = document.querySelector(".image");
    const div = document.querySelector(".movieInfo");
    if(poster === null){
        img.setAttribute("src", `${noImageSrc}`) 
        img.setAttribute("alt" , title)  
        image.append(img)
    }

    else{
        img.setAttribute("src", `https://image.tmdb.org/t/p/w500/${poster}`) 
        img.setAttribute("alt" ,title)  
        image.append(img)
    }        
    
    
    div.innerHTML = ` <div class="block_extraInfo">
    <div class="title"><h2>${title}</h2></div> 
    <div class="budget"><strong>Budget:$ </strong>${budget.toLocaleString('en-US')}</div> 
    <div class="revenue"><strong>Revenue:$ </strong>${revenue.toLocaleString('en-US')}</div> 
    <div class="overview"><strong>Overview: </strong>${overview}</div> 
    </div>`
})

