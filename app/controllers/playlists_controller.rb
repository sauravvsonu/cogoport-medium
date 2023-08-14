class PlaylistsController < ApplicationController
    before_action :authenticate_user!

    def index
        @playlists = current_user.playlists
        render json: @playlists
    end

    def create
        @playlist = current_user.playlists.build(playlist_params)
        if @playlist.save
        render json: @playlist, status: :created
        else
        render json: { error: @playlist.errors.full_messages.join(', ') }, status: :unprocessable_entity
        end
    end

    def add_article
        @playlist = current_user.playlists.find(params[:playlist_id])
        @article = Article.find(params[:article_id])
    
        if @playlist.articles << @article
          render json: { message: "Article added to the playlist" }
        else
          render json: { error: "Failed to add article to the playlist" }, status: :unprocessable_entity
        end
    end

    def show
        @playlist = current_user.playlists.find(params[:id])
        render json: @playlist
    end

    def share
        @playlist = current_user.playlists.find(params[:id])
        render json: { message: 'Playlist shared successfully' }
    end

    private

    def playlist_params
        params.require(:playlist).permit(:title)
    end
end
