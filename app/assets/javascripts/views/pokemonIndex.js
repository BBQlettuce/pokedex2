Pokedex.Views.PokemonIndex = Backbone.View.extend({
  initialize: function() {
    this.collection = new Pokedex.Collections.Pokemon();
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addPokemonToList);
  },

  render: function() {
    this.$el.empty();
    this.collection.each(function(pokemon){
      this.addPokemonToList(pokemon);
    }.bind(this))
  },

  addPokemonToList: function (pokemon) {
    var rendered = JST['pokemonListItem']({pokemon: pokemon});
    this.$el.append(rendered);
  },


  refreshPokemon: function () {
    this.collection.fetch();
  }

})
