//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const server = require("./src/app.js");
const { conn } = require("./src/db.js");
const { Recipe, Diets } = require("./src/db.js");

// Syncing all the models at once.
conn.sync({ force: true }).then(function () {
  server.listen(4000, function () {
    console.log("Server is listening on port 4000!");

    var glutenFree = Diets.create({ name: "gluten free" });

    var ketogenic = Diets.create({ name: "ketogenic" });

    var vegetarian = Diets.create({ name: "vegetarian" });

    var lactoVegetarian = Diets.create({ name: "lacto vegetarian" });

    var ovoVegetarian = Diets.create({ name: "ovo vegetarian" });

    var vegan = Diets.create({ name: "vegan" });

    var pescetarian = Diets.create({ name: "pescetarian" });

    var paleo = Diets.create({ name: "paleo" });

    var primal = Diets.create({ name: "primal" });

    Promise.all([
      glutenFree,
      ketogenic,
      vegetarian,
      lactoVegetarian,
      ovoVegetarian,
      vegan,
      pescetarian,
      paleo,
      primal,
    ]).then((res) => {
      console.log("Categorías precargadas");
    });
  });
});
