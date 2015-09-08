Pokedex.Routers.Router = Backbone.Router.extend({
  initialize: function() {

  },

  routes: {
    "": "pokemonIndex",
    "pokemon/:id": "pokemonDetail"
  },

  pokemonIndex: function (callback) {
    var view = new Pokedex.Views.PokemonIndex();
    this._pokemonIndex = view;
    view.refreshPokemon(callback);
    $("#pokedex .pokemon-list").html(view.$el)
  },

  pokemonDetail: function(id) {
    if (!this._pokemonIndex) {
      this.pokemonIndex(this.pokemonDetail.bind(this, id));
      return;
    }

    var pokemon = this._pokemonIndex.collection.get(id);
    var view = new Pokedex.Views.PokemonDetail({model: pokemon});
    pokemon.fetch();
    $("#pokedex .pokemon-detail").html(view.$el);
  }

})
