Journal.Views = {}

Journal.Views.PostIndex = Backbone.View.extend({

  template: JST["posts/index"],

  tagName: "ul",

  initialize: function () {
    this.collection = new Journal.Collections.Posts();
    this.collection.fetch()
    this.listenTo(this.collection, "remove sync", this.render)
    $("body").html(this.$el)
  },

  refresh: function (callback) {
    this.collection.fetch({
      success: callback
    })
  },

  render: function () {
    this.$el.empty();
    this.collection.each(function(post){
      var p = new Journal.Views.PostIndexItem({ post: post })
      this.$el.append(p.render().$el)
    }.bind(this));

  }

});
;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

Journal.Views.PostIndexItem = Backbone.View.extend({

  tagName: "li",

  initialize: function(options) {
    this.post = options.post;
  },

  template: JST["posts/_postTitle"],

  events:{
  "click .delete-post": "deletePostIndexItem"},


  render: function() {
    this.$el.append(this.template({post: this.post}))
    return this
  },

  deletePostIndexItem: function() {
    this.post.destroy();
  }

})

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


Journal.Views.PostShow = Backbone.View.extend({

  template: JST["posts/show"],

  initialize: function(options) {
    this.post = options.post;
  },

  events: {
    "click .back": "goBack",
    "click .edit-button": "goEdit"
  // "click .edit-form-submit": "goShow"

  },

  render: function() {
    this.$el.empty();
    this.$el.append(this.template({post: this.post}))
    return this
  },

  goBack: function() {
    Backbone.history.history.back()
  },

  goEdit: function(event){
    var callback = function(){ $("body").html(this.render().$el)}.bind(this)
    var postForm = new Journal.Views.PostForm({post: this.post, $el : this.$el, callback : callback});
    $('.edit-button').hide()
  }
  //
  // goShow: function(event) {
  //   $('.edit-button').show()
  //   $("body").html(this.render().$el);
  // }

})

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

Journal.Views.PostForm = Backbone.View.extend({

  template: JST["posts/post_form"],

  initialize: function(options) {
    this.post = options.post;
    this.$el = options.$el;
    this.render();
    this.callback = options.callback;

  },

  events: {
    "click .edit-form-submit" : "editPost"
  },

  render: function() {
    this.$el.append(this.template({post: this.post}));
  },

  editPost: function(event) {
    var that = this;
    event.preventDefault();
    var that = this
    var options = this.$el.find(".edit-form").serializeJSON();
    this.post.save(options, {
      patch: true,
      success: function(){
        Backbone.history.navigate("", {replace: true});
        Backbone.history.navigate("posts/"+that.post.id,{trigger: true, replace: true} )
        }

    })

  }



})
