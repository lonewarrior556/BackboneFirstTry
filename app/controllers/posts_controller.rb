class PostsController < ApplicationController
  respond_to :json

  def index
    @posts = Post.all
    render json: @posts
  end

  def show
    @post = Post.find(params[:id])
    render json: @post
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      render json: @post
    else
      render json: @post.errors.full_messages
    end
  end

  def edit
  end

  def update
    @post = Post.find(params[:id]);
    if @post.update(post_params)
      render json: @post
    else
      render json: @post.errors.full_messages
    end
  end

  def destroy
    @post = Post.find(params[:id])
    @post.destroy
    render json: @post
  end

private

  def post_params
    params.require(:post).permit(:body, :title, :user_id)
  end

end
