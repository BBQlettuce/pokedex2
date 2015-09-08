Pokedex.Views.PokemonDetail = Backbone.View.extend({
  initialize: function() {
    this.pokeTemplate = JST['pokemonDetail'];
    this.toyTemplate = JST['toyListItem'];
    this.listenTo(this.model, "sync", this.render);
  },

  // model: pokemon,

  render: function() {
    // debugger
    this.$el.html(this.pokeTemplate({pokemon: this.model}));
    this.model.toys().each(function(toy) {
      var rendered = this.toyTemplate({toy: toy});
      this.$el.append(rendered);
    }.bind(this));
  }

})
