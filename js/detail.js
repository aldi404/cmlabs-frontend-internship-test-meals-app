const params = new URLSearchParams(window.location.search);
const id_meals = params.get('i');
const detailContainer = document.getElementById('detail-container');

if (id_meals) {
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id_meals}`)
        .then(response => response.json())
        .then(data => {
            displayMeals(data.meals);
        })
        .catch(error => console.error('Error fetching meals:', error));
}

function displayMeals(meals) {
    if (!meals) {
        detailContainer.innerHTML = '<p>No meals found for this category.</p>';
        return;
    }
    
    meals.forEach(meal => {
      let recipes = '';
        for (let i = 1; i <= 20; i++) {
            const measure = meal[`strMeasure${i}`];
            const ingredient = meal[`strIngredient${i}`];

            if (ingredient && ingredient.trim() !== '') {
                recipes += `<li>${measure} ${ingredient}</li>`;
            }
        }

        const youtubeUrl = meal.strYoutube;
        const embedUrl = youtubeUrl.replace('watch?v=', 'embed/');

        const mealDiv = `
        <div class="col-md-12 mb-4" style="text-align: center">
          <h1>${meal.strMeal}</h1>
        </div>
          <div class="col-md-12">
            <div class="img-box">
              <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            </div>
          </div>
          <div class="col-md-12">
            <div class="detail-box">
              <div class="heading_container">
                <p style="font-weight: 800">
                  Recipes
                </p>
              </div>
              <ul style="text-align: justify; list-style-type: disc;">
                ${recipes}
              </ul>
            </div>
          </div>
          <div class="col-md-12">
            <div class="detail-box">
              <div class="heading_container">
                <p style="font-weight: 800">
                  Instructions
                </p>
              </div>
              <p style="text-align: justify">
                ${meal.strInstructions}
              </p>
            </div>
          </div>
          <div class="col-md-12">
            <div class="detail-box">
              <div class="heading_container">
                <p style="font-weight: 800">
                  Tutorial
                </p>
              </div>
              <div class="video_tutorial">
              <iframe style="width: 100%; height: 100%; object-fit: contain"
               src="${embedUrl}">
               </iframe> 
              </div>
            </div>
          </div>`;

        detailContainer.innerHTML += mealDiv;
    });
}