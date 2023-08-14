class ProfilesController < ApplicationController

    def create_profile
        @user = current_user
        @profile = Profile.create(user: @user, bio: params[:bio], name: params[:name], interested_topics: params[:interested_topics], save_for_later: params[:save_for_later])
        if @profile.save
            render json: @user.profile
        else 
            render Article.all
        end
    end

    def show
        @user = User.find(params[:id])
        @profile = @user.profile
        @articles = @user.articles
        render json: @user.profile
    end

    def my_profile
        @user = current_user
        @profile = @user.profile
        @articles = @user.articles
        render json: @user.profile
    end
    
    def follow
      @user= User.find(params[:id])
      current_user.follow(@user)
      render json: "Following user"
    end

    def unfollow
      @user= User.find(params[:id])
      current_user.unfollow(@user)
      render json: "Unfollowing user"
    end
end
