Journal.Router = Backbone.Router.extend({
  routes: {
    "": "postIndex",
    "posts/:id": "postShow",
    "posts/:id/": "postShow"
  },

  postIndex: function (callback) {
    this._allPost = new Journal.Views.PostIndex();
    this._allPost.refresh(callback);
  },


  postShow: function(id, callback) {
    if (!this._allPost) {
      this.postIndex (this.postShow.bind(this, id));
    }
    else {
      var post = this._allPost.collection.getOrFetch(id);
      this._pII = new Journal.Views.PostShow({post: post});
      $("body").html(this._pII.render().$el);
    }
  }

})
