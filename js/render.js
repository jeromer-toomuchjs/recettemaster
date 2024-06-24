function renderMesRecettes() {
  $("#recette_list").empty();

  for (let id = 0; id < mes_recettes.length; id++) {
    var recette = $(
      '<div class="recette rounded ' +
        mes_recettes[id].possibility +
        '" id="recette' +
        id +
        '"><input type="hidden" value="' +
        id +
        '" class="recette_id"/><h2>' +
        mes_recettes[id].title +
        '</h2><ul class="ingredient_list">' +
        mes_recettes[id].ingredient_list +
        '</ul><div class="m-1" style="text-align:center;"><input type="button" value="Manger" class="manger"/></div></div>'
    );

    $("#recette_list").append(recette);

    // Double-click sur le nom de la recette pour l'éditer
    $(".recette h2").off("dblclick").on("dblclick", editRecetteTitle);

    // Double-click sur la liste des ingrédients pour l'éditer
    $(".recette ul").off("dblclick").on("dblclick", editRecetteIngredients);

    // Click sur manger pour retirer les ingrédients du garde-manger
    $(".manger").off("click").on("click", eatRecette);
  }
}

function renderCoursesIngredients() {
  $(".courses_ingredients").empty().append("<ul></ul>");

  for (const name in liste_de_courses) {
    $(".courses_ingredients ul").append(
      "<li>" +
        ingredient_string(
          liste_de_courses[name][1],
          liste_de_courses[name][0],
          name
        ) +
        "</li>"
    );
  }
}
function renderGardeManger() {
  $("#garde_manger").empty().append("<ul></ul>");

  for (const name in garde_manger) {
    $("#garde_manger ul").append(
      "<li>" +
        ingredient_string(garde_manger[name][1], garde_manger[name][0], name) +
        "</li>"
    );
  }
}

function renderCoursesRecettes() {
  $(".courses_recettes").empty();

  for (let id = 0; id < mes_recettes.length; id++) {
    var recette = $(
      '<div class="recette" id="recette' +
        id +
        '"><input type="hidden" value="' +
        id +
        '" class="recette_id"/><h2><span class="remove_from_courses">-</span> ' +
        mes_recettes[id].title +
        ' <span class="add_to_courses">+</span></h2></div>'
    );

    $(".courses_recettes").append(recette);

    $(".add_to_courses").off("click").on("click", addToCourses);
    $(".remove_from_courses").off("click").on("click", removeFromCourses);
  }
  $(".finishCourses").off("click").on("click", finishCourses);
}
