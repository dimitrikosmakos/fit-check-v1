let num_of_reqs = 10;
let k_categories = 3;

const getRecommendation = async (outfit) => {
  let gender = "women"
  if (outfit.preference == 'masc') {
    gender = "men"
  }
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };
  const clothing_lookup = require("../../data/clothing_store/" +
    gender +
    "-lookup.json");
  let categories = outfit["categories"];

  topK_categories = categories.slice(0, k_categories);
  recommendations = new Set();
  for (category of topK_categories) {
    cate_product= clothing_lookup[category.name];
    if (cate_product) {
      shuffleArray(cate_product);
      if (cate_product.length > num_of_reqs) {
        cate_product = cate_product.slice(0, num_of_reqs);
      }
      cate_product.forEach((image) => recommendations.add(image));
    }
    
  }
  recommendations = Array.from(recommendations)
  shuffleArray(recommendations)
  if (recommendations.length > num_of_reqs) {
    recommendations = recommendations.slice(0, num_of_reqs);
  }
  return recommendations
}

module.exports = getRecommendation;
