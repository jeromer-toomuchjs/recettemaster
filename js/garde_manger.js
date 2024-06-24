function eatRecette() {
  id = $(this).parents(".recette").find(".recette_id").val();
  for (const name in mes_recettes[id].ingredients) {
    if (garde_manger[name] !== undefined) {
      // prettier-ignore
      if(garde_manger[name][1] - mes_recettes[id].ingredients[name][1] > 0){
          garde_manger[name][1] -= mes_recettes[id].ingredients[name][1];
        }
        else{
          delete garde_manger[name];
        }
    }
  }
  renderMesRecettes();
  save();
}
