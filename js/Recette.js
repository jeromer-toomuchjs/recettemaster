class Recette {
  constructor(title, ingredients = []) {
    this.title = title;
    this.ingredients = {};
    if (ingredients.length > 0) {
      for (let i = 0; i < ingredients.length; i++) {
        this.add_ingredient(...ingredients[i]);
      }
    }
  }

  export_recette() {
    var ingredient_array = [];
    for (const name in this.ingredients) {
      ingredient_array.push([
        this.ingredients[name][1],
        this.ingredients[name][0],
        name,
      ]);
    }
    return [this.title, ingredient_array];
  }

  add_ingredient(quantity, quantity_type, ingredient_name) {
    this.ingredients[ingredient_name] = [quantity_type, quantity * 1];
  }

  remove_ingredient(ingredient_name) {
    delete this.ingredients[ingredient_name];
  }

  edit_title(new_title) {
    this.title = new_title;
  }
  get ingredient_list() {
    var return_string = "";
    for (const name in this.ingredients) {
      return_string +=
        "<li>" +
        ingredient_string(
          this.ingredients[name][1],
          this.ingredients[name][0],
          name
        ) +
        "</li>";
    }
    return return_string;
  }

  get modifiable_ingredient_list() {
    var return_string = "";
    for (const name in this.ingredients) {
      return_string +=
        '<li><input type="hidden" value="' +
        name +
        '" class="ingredient_id"/>' +
        '<input type="text" class="quantity w-25" value="' +
        this.ingredients[name][1] +
        '"/>' +
        '<select class="quantity_type w-25"><option value="u" ' +
        (this.ingredients[name][0] == "u" ? "selected" : "") +
        '>Unités</option><option value="cl"' +
        (this.ingredients[name][0] == "cl" ? "selected" : "") +
        '>Centilitres</option><option value="g"' +
        (this.ingredients[name][0] == "g" ? "selected" : "") +
        ">Grammes</option></select>" +
        name +
        "</li>";
    }
    return return_string;
  }

  get ingredient_names() {
    return Object.keys(this.ingredients);
  }

  get possibility() {
    var possible = true;
    var withshopping = true;
    for (const name in this.ingredients) {
      if (garde_manger[name] == undefined) {
        possible = false;
        if (liste_de_courses[name] == undefined) {
          withshopping = false;
        } else if (liste_de_courses[name][1] * 1 < this.ingredients[name][1]) {
          withshopping = false;
        }
      } else if (garde_manger[name][1] < this.ingredients[name][1]) {
        possible = false;

        if (liste_de_courses[name] == undefined) {
          withshopping = false;
        } else if (
          garde_manger[name][1] * 1 + liste_de_courses[name][1] * 1 <
          this.ingredients[name][1]
        ) {
          withshopping = false;
        }
      }
      if (!withshopping && !possible) {
        break;
      }
    }
    return possible ? "possible" : withshopping ? "withshopping" : "impossible";
  }
}
