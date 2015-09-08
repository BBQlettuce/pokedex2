Pokedex.Routers.Router = Backbone.Router.extend({
  initialize: function() {

  },

  routes: {
    "": "pokemonIndex",
    "pokemon/:id": "pokemonDetail",
    "pokemon/:pokemonId/toys/:toyId": "toyDetail"
  },

  pokemonIndex: function (callback) {
    var view = new Pokedex.Views.PokemonIndex();
    this._pokemonIndex = view;
    view.refreshPokemon(callback);
    $("#pokedex .pokemon-list").html(view.$el)
  },

  pokemonDetail: function(id, callback) {
    if (!this._pokemonIndex) {
      this.pokemonIndex(this.pokemonDetail.bind(this, id, callback));
      return;
    }

    var pokemon = this._pokemonIndex.collection.get(id);
    var view = new Pokedex.Views.PokemonDetail({model: pokemon});
    this._pokemonDetail = view;
    pokemon.fetch({
      success: function () {
        callback && callback();
      }
    });
    $("#pokedex .pokemon-detail").html(view.$el);
  },

  toyDetail: function(pokemonId, toyId) {
    if (!this._pokemonDetail) {
      this.pokemonDetail(pokemonId, this.toyDetail.bind(this, pokemonId, toyId));
      return;
    }
    
    var toys = this._pokemonDetail.model.toys();
    var toy = toys.get(toyId);
    var view = new Pokedex.Views.ToyDetail({model: toy});

    view.render();
    $("#pokedex .toy-detail").html(view.$el)
  }
})

// var toy = this.model.toys().get(toyId);
// // debugger
// var view = new Pokedex.Views.ToyDetail({model: toy})
// $("#pokedex .toy-detail").html(view.$el);
// view.render();
