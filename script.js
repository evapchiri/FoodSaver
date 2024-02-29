// FINAL PAGE starts

let firstSlice;
let finalRecipes;

const recipeBox = document.getElementById("recipebox");

function addRecipeBoxes(slice) {
  for (let i = 0; i < slice.length; i++) {
    const recipe = slice[i];

    // Creating & styling the button for the recipe
    const newButton = document.createElement("button");
    newButton.id = recipe.recipe.label;
    newButton.style.backgroundImage = `url(${recipe.recipe.image})`;
    newButton.classList.add("recButton");

    // Adding the link to the Recipe Button
    const RecURL = document.createElement("a");
    RecURL.href = recipe.recipe.url;
    RecURL.appendChild(newButton);

    const recipeBox = document.getElementById("recipebox");
    recipeBox.appendChild(RecURL);

    // Adding mouseover event listener to display recipe title
    const recipeButton = document.getElementById(recipe.recipe.label);
    newButton.onmouseover = function () {
      newButton.textContent = recipe.recipe.label;
    };
    newButton.onmouseout = function () {
      newButton.textContent = "";
    };
  }
}

function addMoreButtons() {
  const startIndex = recipeBox.children.length;
  const endIndex = Math.min(startIndex + 3, finalRecipes.length);
  addRecipeBoxes(finalRecipes.slice(startIndex, endIndex));
}

document.getElementById("moreRec").addEventListener("click", addMoreButtons);

// FINAL PAGE ends

// LANDING PAGE starts

const apiKey = "b86c044152msh64a51cb91492598p1d0908jsn9ca622e2b935";
const apiHost = "edamam-recipe-search.p.rapidapi.com";

const dietButtons = Array.from(document.getElementsByClassName("button"));

                                    
dietButtons.forEach((button) => {
    button.addEventListener("click", () => {
      dietButtons.forEach( (b) => 
       b.classList.remove('selected'));
      button.classList.add('selected')})});
                          
function selectDiet(diet) {
  document.getElementById("diet").setAttribute("value", diet);
};


const getRecipes = document.getElementById("getRecipes");

// I have added this to switch to FINAL PAGE -Eva

function toggleHidden() {
  document.getElementById("landing-page").classList.add("hidden");
  document.getElementById("final-page").classList.remove("hidden");
};

// Fetching recipes

getRecipes.addEventListener("click", async (e) => {
  e.preventDefault();

  const ingredient = document.getElementById("ingredient").value.trim();
  const exclude = document.getElementById("exclude").value.trim();
  const diet = document.getElementById("diet").value;

  if (!ingredient || !exclude || !diet) {
    alert("Please fill in all fields.");
    return;
  }

  const url = `https://${apiHost}/api/recipes/v2?type=public&co2EmissionsClass=A%2B&field%5B0%5D=uri&beta=true&random=true&cuisineType%5B0%5D=American&imageSize%5B0%5D=LARGE&mealType%5B0%5D=Breakfast&health%5B0%5D=alcohol-cocktail&diet%5B0%5D=${diet}&q=${ingredient}&excludedIngredients=${exclude}`;

  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": apiHost,
    },
    mode: "cors",
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();

    if (result.hits && result.hits.length > 0) {
      finalRecipes = result.hits;
      console.log(finalRecipes)
      firstSlice = finalRecipes.slice(0,3);
      console.log(firstSlice)

      finalRecipes.sort((a, b) => a.recipe.totalTime - b.recipe.totalTime);
      
      addRecipeBoxes(firstSlice);
      toggleHidden();
    } else {
      alert("No recipe found.");
    }
  } catch (error) {
    console.error(error);
    alert("Failed to fetch recipe.");
  }
});

// LANDING PAGE ends
