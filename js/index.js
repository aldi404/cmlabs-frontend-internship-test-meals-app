const apiUrl = 'https://www.themealdb.com/api/json/v1/1/categories.php';

async function getCategories() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    displayCategories(data.categories);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayCategories(categories) {
  const container = document.getElementById('categories-container');
  container.innerHTML = '';

  categories.forEach(category => {
    const categoryUrl = `category.html?c=${encodeURIComponent(category.strCategory)}`;

    const categoryDiv = `
        <div class="col-sm-6 col-lg-4 all pasta">
            <div class="box">
              <div>
                <div class="img-box">
                  <img src="${category.strCategoryThumb}" alt="${category.strCategory}">
                </div>
                <div class="detail-box">
                  <h5>
                    ${category.strCategory}
                  </h5>
                  <p>
                    ${category.strCategoryDescription.substring(0, 100)}
                  </p>
                  <div class="options">
                    <a href="${categoryUrl}">
                      <i class="fa-solid fa-cart-shopping"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
        </div>`;

    container.innerHTML += categoryDiv;
  });
}

getCategories();


const items = [{
        title: 'Meals App',
        description: 'Meals App is a culinary platform that helps you discover a variety of recipes from around the world. From everyday meals to special dishes, we provide a wide range of easy-to-follow recipes suitable for any occasion. Enjoy a delightful cooking experience with step-by-step guides, ingredient recommendations, and expert cooking tips.',
        link: '#'
    },
    {
        title: 'Healthy Recipes',
        description: 'Find healthy and delicious recipes that fit your lifestyle and dietary preferences. From quick breakfasts to satisfying dinners, we have it all!',
        link: '#'
    },
    {
        title: 'Gourmet Dishes',
        description: 'Explore gourmet dishes that bring fine dining to your home. Perfect for special occasions or when you want to treat yourself.',
        link: '#'
    }
];

const carousel = document.getElementById('carousel');

items.forEach((item, index) => {
    const div = document.createElement('div');
    div.className = 'carousel-item ' + (index === 0 ? 'active' : '');

    div.innerHTML = `
            <div class="container">
                <div class="row">
                    <div class="col-md-7 col-lg-6">
                        <div class="detail-box">
                            <h1>${item.title}</h1>
                            <p>${item.description}</p>
                            <div class="btn-box">
                                <a href="${item.link}" class="btn1">Order Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

    carousel.appendChild(div);
});