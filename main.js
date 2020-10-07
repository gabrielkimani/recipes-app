const form = document.querySelector('form');
const recipesContainer = document.querySelector('.recipes-container');
let container = document.querySelector('.container');
let search = '';
let optionValue = '';

const APP_id = '045610ed';
const API_key = '4f68da1b723a88be13af6bc24d5a45c6';
//const url = `https://api.edamam.com/search?q=${search}&app_id=${APP_id}&app_key=${API_key}&to=20`;

form.addEventListener('submit', e => {
	e.preventDefault();
	search = e.target.querySelector('input').value;
	optionValue = e.target.querySelector('#option').value;
	fetchRecipes(search, optionValue);
});

async function fetchRecipes(search, optionValue) {
	const url = `https://api.edamam.com/search?q=${search}&app_id=${APP_id}&app_key=${API_key}&to=${optionValue}`;
	await fetch(url)
		.then(res => res.json())
		.then(data => getRecipes(data.hits, search))
		.catch(err => console.log(err, 'failed'));
}

//get recipes read-more

function getRecipes(recipes, search) {
	let generatedRecipes = '';
	let h = document.createElement('p');
	h.classList.add('results');
	let text = document.createTextNode(
		`Showing ${recipes.length} results of ${search}`
	);
	h.appendChild(text);
	let title = document.querySelector('.title');
	container.insertBefore(h, title);
	setTimeout(() => {
		document.querySelector('.results').remove();
	}, 5000);
	if (recipes.length < `${optionValue}`) {
		text.textContent = `loading...oops! we seem not to have "${search}"`;
	}
	recipes.map(item => {
		generatedRecipes += `
       <div class="item">
       <img src='${item.recipe.image}' alt="" />
	   <div class="item-info">
	   <h2>${item.recipe.label}</h2>
	   <button><a href="${item.recipe.url}">recipe</a></button>
		</div>
        <h3>calories: ${item.recipe.calories.toFixed(2)}</h3>
        <p>${item.recipe.healthLabels}</p>
        <h4>Diet level: ${
					item.recipe.dietLabels.length > 0
						? item.recipe.dietLabels
						: 'No data found'
				}</h4>
		</div>
      `;
	});

	recipesContainer.innerHTML = generatedRecipes;
}
