Pokedex.Views.ToyDetail = Backbone.View.extend({
  initialize: function () {
    this.template = JST["toyDetail"]
  },

  render: function () {
    // debugger
    var rendered = this.template({toy: this.model, pokes: [], pokemonId: this.model.id});
    this.$el.html(rendered);
  }

})
