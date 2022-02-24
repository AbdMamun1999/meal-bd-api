const searchFood = () =>{
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value
    
    // input field clear
    searchField.value = '';  
    if(searchText == ''){
        searchField.placeholder = 'please search here';
    }
    else{
        // load data
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        fetch(url)
        .then(response => response.json())
        .then(data => displaySearchResult(data.meals))
    }
    
}

const displaySearchResult = meals =>{
    const searchResultDiv = document.getElementById('search-result');
    // clear searchReaultDiv
    // searchResultDiv.innerHTML = ' '
    searchResultDiv.textContent = ' ';
    // if(meals.length == 0){
    //     // show no result
    // }
    meals.forEach(meal => {
        // console.log(meal)
       const div = document.createElement('div');
       div.classList.add('col')
       div.innerHTML = `
        <div onclick="loadMealDetails(${meal.idMeal})" class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meal.strMeal}</h5>
                <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
            </div>
        </div>
       `;
        searchResultDiv.appendChild(div)
    });
}

const loadMealDetails = (mealId) =>{
    // console.log(mealId)
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    console.log(url)
    fetch(url)
    .then(res => res.json())
    .then(data => displayMealDetails(data.meals[0]))
}

const displayMealDetails = meal =>{
    console.log(meal)
    const mealDetailsDiv = document.getElementById('meal-details');
    // clear mealDetailDiv
    mealDetailsDiv.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card')
    div.innerHTML =  `
        <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${meal.idMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0,200)}</p>
            <a href="${meal.strYoutube}" class="btn btn-primary">Go somewhere</a>
        </div>
    `;
    mealDetailsDiv.appendChild(div)
}