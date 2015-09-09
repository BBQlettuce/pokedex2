Pokedex.Views.PokemonForm = Backbone.View.extend({
  initialize: function() {
    this.template = JST['pokemonForm'];
  },

  events: {
    "submit form": "savePokemon"
  },

  savePokemon: function(event) {
    event.preventDefault();

    var formInputs = $(event.currentTarget).serializeJSON().pokemon;
    // this.model.set(formInputs);
    this.model.save(formInputs, {
      success: function(model) {
        this.collection.add(model);
        Backbone.history.navigate("pokemon/" + model.id, {trigger: true});
        this.model = new Pokedex.Models.Pokemon();
        this.render();
      }.bind(this)
    });
  },

  render: function() {
    var rendered = this.template({pokemon: this.model});
    this.$el.html(rendered);
  }
})
