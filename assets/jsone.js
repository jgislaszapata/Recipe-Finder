//get search button element ID
var generateResultsOne = document.getElementById('search-buttonTwo');

var apiKey = "4e9c1647bamsh75f9980fca9fd27p176220jsn6936ac7b1a28"
//global variable to get ingredient ID
var ingredientIDs = [];

//Event listener is added to search button
$("#results").hide();

generateResultsOne.addEventListener("click", getRecipe);

//Function getRecipe is invoked when search button is clicked.
//This function inturn calls getrecipeID to get top 5 ingredient ID's for the entered ingredient
//Ingredient IDs are then passed to getRecipe function to retrive information like Title, Image, PrepTime and Instructions 

// The reason behind two API calls is that API used in getRecipe function requires 
async function getRecipe() {

await getReceipeID();
 console.log(ingredientIDs);

  const NutritionOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };
  $("#results").show();
  for (var i = 0; i < 5; i++) {
   await fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/' + ingredientIDs[i] + '/information', NutritionOptions)
      .then(function (res) {
        return res.json();
      })
      .then(function (data1) {
        console.log("recipe details" ,data1);
        $("#title_" + i).text(data1.title);
        var img = document.createElement("IMG");
        img.src = data1.image;
        
        $("#recipe_" + i).append(img);

        $("#prepTime_" + i).text(data1.calories);
        $("#instruction_" + i).text(data1.carbs);

      })
     
      .catch(err => console.error(err));

  }
}

//This API call converts the user entered ingredient and fetchs corresponding ID
async function getReceipeID() {
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };
  var ingredientSearch = $("#location-inputTwo").val();
 await fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByIngredients?ingredients=' + ingredientSearch, options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log("receipe id" ,data);
       ingredientIDs = [];
      for (var i = 0; i < 5; i++) {
        ingredientIDs[i] = data[i].id;
      }
      console.log("ingredient id", ingredientIDs);
    
    })
    .catch(err => console.error(err));
}

async function Searchbynutrients() {
	const options = {
	  method: 'GET',
	  headers: {
		'X-RapidAPI-Key': apiKey,
		'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
	  }
	};

	
	var NutritionSearch = $("#location-inputTwo").val();
   await fetch('https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/findByNutrients?limitLicense=false&' + NutritionSearch, options)
	  .then(function (response) {
		return response.json();
	  })
	  .then(function (data) {
		console.log("nutrient id" ,data);
		 NutritionSearch = [];
		for (var i = 0; i < 5; i++) {
		  [i] = data[i].id;
		}
		console.log("nutrition ids", nutritionIDS);
	  
	  })
	  .catch(err => console.error(err));
  }
