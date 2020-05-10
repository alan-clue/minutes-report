class Api::PostController < ApplicationController
  def index
    day = Date.parse(params[:date])
    range = day.beginning_of_day..day.end_of_day
    post = Post.where(created_at: range)
    render json: post
  end

  def create
    post = Post.new(body: post_params[:body])
    if post.save
      render json: post
    else
      render json: post.errors, status: :unprocessable_entity
    end
  end

  def update
    post = Post.find(params[:id])
    if post.update(post_params)
      render json: post
    else
      render json: post.errors, status: :unprocessable_entity
    end
  end

  private

    def post_params
      args = params.require(:post).permit(:body)
    end
end
