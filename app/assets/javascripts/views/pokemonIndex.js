Pokedex.Views.PokemonIndex = Backbone.View.extend({
  initialize: function() {
    this.collection = new Pokedex.Collections.Pokemon();
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addPokemonToList);
  },

  events: {
    "click li": "selectPokemonFromList"
  },

  selectPokemonFromList: function(event) {
    var pokemonId = $(event.currentTarget).data('id');
    Backbone.history.navigate("pokemon/" + pokemonId, {trigger: true});
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


  refreshPokemon: function (callback) {
    this.collection.fetch({
      success: function () {
        callback && callback()
      }
    });
  }

})
