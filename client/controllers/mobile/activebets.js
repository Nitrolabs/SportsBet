ActivebetsController = RouteController.extend({
  waitOn: function () {
  },

  data: function () {
  	return {_id:this.params._id}
  },

  action: function () {
    this.render();
  }
});