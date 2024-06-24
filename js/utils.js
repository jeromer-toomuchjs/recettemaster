// Help autocomplete with special characters
var accentMap = {
  œ: "oe",
  æ: "ae",
  ö: "o",
  ë: "e",
  ï: "i",
  é: "e",
  è: "e",
  à: "a",
  ô: "o",
  ê: "e",
  î: "i",
  â: "a",
  ç: "c",
  ù: "u",
};
var normalize = function (term) {
  var ret = "";
  for (var i = 0; i < term.length; i++) {
    ret += accentMap[term.charAt(i)] || term.charAt(i);
  }
  return ret;
};
// String functions to display ingredients
function plural(ingredient_name) {
  return ingredient_name.replace(/[\(\)]/gi, "");
}

function singular(ingredient_name) {
  return ingredient_name.replace(/(\(.*\))/gi, "");
}

function quantity_string(quantity, quantity_type) {
  if (quantity > 1000 && quantity_type == "g") {
    return quantity / 1000 + " kg";
  } else if (quantity > 100 && quantity_type == "cl") {
    return quantity / 100 + " L";
  } else {
    return quantity + " " + quantity_type;
  }
}

function ingredient_string(quantity, quantity_type, ingredient_name) {
  if (quantity_type == "u") {
    return quantity > 1
      ? quantity + " " + plural(ingredient_name)
      : quantity + " " + singular(ingredient_name);
  } else {
    return quantity_string(quantity, quantity_type) + " de " + ingredient_name;
  }
}
