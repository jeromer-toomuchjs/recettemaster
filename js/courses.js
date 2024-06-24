function addToCourses() {
  id = $(this).parents(".recette").find(".recette_id").val();
  for (const name in mes_recettes[id].ingredients) {
    if (liste_de_courses[name] !== undefined) {
      liste_de_courses[name][1] =
        liste_de_courses[name][1] * 1 +
        mes_recettes[id].ingredients[name][1] * 1;
    } else {
      liste_de_courses[name] = [
        "" + mes_recettes[id].ingredients[name][0],
        mes_recettes[id].ingredients[name][1] * 1,
      ];
    }
  }
  renderCoursesIngredients();
  save();
}

function removeFromCourses() {
  id = $(this).parents(".recette").find(".recette_id").val();
  for (const name in mes_recettes[id].ingredients) {
    if (liste_de_courses[name] !== undefined) {
      // prettier-ignore
      if(liste_de_courses[name][1]*1 - mes_recettes[id].ingredients[name][1]*1 > 0){
          liste_de_courses[name][1] = liste_de_courses[name][1]*1 - mes_recettes[id].ingredients[name][1]*1;
        }
        else{
          delete liste_de_courses[name];
        }
    }
  }
  renderCoursesIngredients();
  save();
}

function finishCourses() {
  for (const name in liste_de_courses) {
    if (garde_manger[name] !== undefined) {
      garde_manger[name][1] =
        garde_manger[name][1] * 1 + liste_de_courses[name][1] * 1;
    } else {
      garde_manger[name] = [
        "" + liste_de_courses[name][0],
        liste_de_courses[name][1] * 1,
      ];
    }
    delete liste_de_courses[name];
  }
  renderCoursesIngredients();
  save();
}
