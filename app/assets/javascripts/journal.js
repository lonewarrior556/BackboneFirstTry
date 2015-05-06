window.Journal = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    new Journal.Router("body");
    Backbone.history.start();
  }
};

$(document).ready(function(){
  Journal.initialize();
});
