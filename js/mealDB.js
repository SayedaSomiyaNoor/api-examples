const searchFood = () => {
    const searchField=document.getElementById('search-feild');
    const searchText=searchField.value;
    searchField.value='';
    if (searchText==''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Please write the meal name to search",

        });
    }
    else{
        const url=`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.meals))
    }
}
const displaySearchResult = meals => {
    const searchResult=document.getElementById('search-result');
    searchResult.innerHTML='';
     // or use textContent
    if (meals == null) {
        //show no result found
        const nullSearch = document.getElementById('null-search');
        nullSearch.innerText = `No result found please search for another meal`;

    }
    else {

        const nullSearch = document.getElementById('null-search');
        nullSearch.innerHTML = '';
    
       meals.forEach(meal => {
        //console.log(meal)
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`<div onclick="loadMealId(${meal.idMeal})" class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
        </div>
      </div>`
      searchResult.appendChild(div);
    });
}
}
const loadMealId = mealId => {
    const url=`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]) )
}
const displayMealDetails = meal => {
    console.log(meal);
    const mealDetails=document.getElementById('meal-details');
    const div=document.createElement('div');
    div.classList.add('card');
    div.innerHTML=`<img src="${meal.strMealThumb}" class="card-img-top" alt="...">
    <div class="card-body">
        <h5 class="card-title">${meal.strMeal}</h5>
        <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
        <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
    </div>`
    mealDetails.appendChild(div);
}