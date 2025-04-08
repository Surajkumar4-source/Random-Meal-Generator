const get_meal_btn = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');
const loader = document.getElementById('loader');
const darkToggle = document.getElementById('toggle-dark');

// Toggle dark mode
darkToggle.addEventListener('click', () => {
	document.body.classList.toggle('dark');
	if (document.body.classList.contains('dark')) {
		darkToggle.textContent = '☀️ Light Mode';
	} else {
		darkToggle.textContent = '🌙 Dark Mode';
	}
});

// Fetch random meal
get_meal_btn.addEventListener('click', () => {
	meal_container.innerHTML = '';
	loader.classList.remove('hidden');

	fetch('https://www.themealdb.com/api/json/v1/1/random.php')
		.then(res => res.json())
		.then(res => {
			createMeal(res.meals[0]);
			loader.classList.add('hidden');
		})
		.catch(() => {
			meal_container.innerHTML = "<p>Failed to fetch meal. Please try again.</p>";
			loader.classList.add('hidden');
		});
});

const createMeal = (meal) => {
	const ingredients = [];

	for (let i = 1; i <= 20; i++) {
		if (meal[`strIngredient${i}`]) {
			ingredients.push(`${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`);
		} else {
			break;
		}
	}

	const newInnerHTML = `
		<div class="row">
			<div class="columns">
				<img src="${meal.strMealThumb}" alt="Meal Image">
				${meal.strCategory ? `<p><strong>Category:</strong> ${meal.strCategory}</p>` : ''}
				${meal.strArea ? `<p><strong>Area:</strong> ${meal.strArea}</p>` : ''}
				${meal.strTags ? `<p><strong>Tags:</strong> ${meal.strTags.split(',').join(', ')}</p>` : ''}
				<h5>Ingredients:</h5>
				<ul>
					${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
				</ul>
			</div>
			<div class="columns">
				<h4>${meal.strMeal}</h4>
				<p>${meal.strInstructions}</p>
			</div>
		</div>
		${meal.strYoutube ? `
			<div class="videoWrapper">
				<iframe 
					src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}"
					allowfullscreen>
				</iframe>
			</div>
		` : ''}
	`;

	meal_container.innerHTML = newInnerHTML;
};
