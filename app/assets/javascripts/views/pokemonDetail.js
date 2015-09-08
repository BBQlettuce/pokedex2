Pokedex.Views.PokemonDetail = Backbone.View.extend({
  initialize: function() {
    this.pokeTemplate = JST['pokemonDetail'];
    this.toyTemplate = JST['toyListItem'];
    this.listenTo(this.model, "sync", this.render);
  },

  // model: pokemon,

  events: {
    "click li": "selectToyFromList"
  },

  render: function() {
    // debugger
    this.$el.html(this.pokeTemplate({pokemon: this.model}));
    this.model.toys().each(function(toy) {
      var rendered = this.toyTemplate({toy: toy});
      this.$el.append(rendered);
    }.bind(this));
  },

  selectToyFromList: function (event) {
    var toyId = $(event.currentTarget).data('toy-id');
    // var pokemonId = $(event.currentTarget).data('pokemon-id');
    var toy = this.model.toys().get(toyId);
    // debugger
    var view = new Pokedex.Views.ToyDetail({model: toy})
    $("#pokedex .toy-detail").html(view.$el);
    view.render();
  }

})
