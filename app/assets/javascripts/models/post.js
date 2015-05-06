window.Journal = (window.Journal || {});
window.Journal.Models = {};
window.Journal.Collections = {};

Journal.Models.Post = Backbone.Model.extend({
  urlRoot: '/posts'

})


Journal.Collections.Posts = Backbone.Collection.extend({
  model: Journal.Models.Post,
  url: '/posts',

  getOrFetch: function (id) {
    var collection = this;

    var post = this.get(id);
    if (post) {
      post.fetch();
    }
    else {
      post = new Journal.Models.Post ({ id: id});
      post.fetch({
        success: function () {
          collection.add(post);
        }
      });
    }

  return post;
  }

});
