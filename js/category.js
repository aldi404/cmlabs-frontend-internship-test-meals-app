const params = new URLSearchParams(window.location.search);
const category = params.get('c');
const mealsContainer = document.getElementById('meals-container');
const menu_name = document.getElementById('menu-name');

// Memastikan kategori ada
if (category) {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
        .then(response => response.json())
        .then(data => {
            displayMeals(data.meals);
        })
        .catch(error => console.error('Error fetching meals:', error));
}

// Fungsi untuk menampilkan daftar makanan
function displayMeals(meals) {
    if (!meals) {
        mealsContainer.innerHTML = '<p>No meals found for this category.</p>';
        return;
    }

    menu_name.innerHTML = category + ' Menu';
    
    meals.forEach(meal => {
        const detailUrl = `detail.html?i=${encodeURIComponent(meal.idMeal)}`;
        const mealDiv = `
        <div class="col-md-6">
            <div class="box">
              <div class="img-box">
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
              </div>
              <div class="detail-box">
                <h5>
                  ${meal.strMeal}
                </h5>
                <h6>
                  Rp. ${Number(meal.idMeal).toLocaleString()}
                </h6>
                <a href="${detailUrl}">
                  Detail
                </a>
              </div>
            </div>
          </div>`;

        mealsContainer.innerHTML += mealDiv;
    });
}