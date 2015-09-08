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
    // debugger
    var pokemon = this.collection.get(pokemonId);
    var view = new Pokedex.Views.PokemonDetail({model: pokemon});
    pokemon.fetch();

    $("#pokedex .pokemon-detail").html(view.$el);

    // view.render();

    // console.log(pokemon.escape('name'));
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
