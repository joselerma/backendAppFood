const { Router } = require("express");
const fetch = require("node-fetch");
require("dotenv").config();
const { API_KEY } = process.env;
const { Recipe, Diets } = require("../db.js");
const { uuid } = require("uuidv4");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes", async (req, res) => {
  var respuesta;
  await Recipe.findAll({
    where: { title: req.query.name.toLocaleLowerCase() },
    include: { model: Diets },
  }).then((recipes) => (respuesta = recipes));

  fetch(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&query=${req.query.name}&addRecipeInformation=true&number=16`
  )
    .then((response) => response.json())
    .then((response) => response.results)
    .then((response) =>
      respuesta.length > 0 ? response.concat(respuesta) : response
    )
    .then((response) => res.json(response));
});

router.get("/recipes/:recipeId", (req, res) => {
  fetch(
    `https://api.spoonacular.com/recipes/${req.params.recipeId}/analyzedInstructions?apiKey=${API_KEY}`
  )
    .then((response) => response.json())
    .then((response) => res.json(response));
});

router.get("/types", (req, res) => {
  Diets.findAll().then((types) => res.json(types));
});

router.post("/recipe", async (req, res) => {
  var health = parseInt(req.body.form[0].health);
  var score2 = parseInt(req.body.form[0].score);
  var recipe = await Recipe.create({
    id: uuid(),
    title: req.body.form[0].name.toLocaleLowerCase(),
    image: "logo",
    ingredients: req.body.form[0].resume,
    spoonacularScore: score2,
    healthScore: health,
    steps: req.body.form[0].steps,
  });
  var obj = req.body.form[1];
  var arr = [];
  for (var elem in obj) {
    if (obj[elem] === true) arr.push(elem);
  }

  var arr2 = [];

  arr.forEach((elem, ind) => {
    if (elem == "glutenFree") {
      arr2.push(1);
    } else if (elem == "ketogenic") {
      arr2.push(2);
    } else if (elem == "vegetarian") {
      arr2.push(3);
    } else if (elem == "lactoVegetarian") {
      arr2.push(4);
    } else if (elem == "ovoVegetarian") {
      arr2.push(5);
    } else if (elem == "vegan") {
      arr2.push(6);
    } else if (elem == "pescetarian") {
      arr2.push(7);
    } else if (elem == "paleo") {
      arr2.push(8);
    } else if (elem == "primal") {
      arr2.push(9);
    }
  });
  await recipe.setDiets(arr2);
  res.json("Recipe Created");
});

module.exports = router;
