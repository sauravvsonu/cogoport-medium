class CreateArticlesPlaylistsJoinTable < ActiveRecord::Migration[7.0]
  def change
    create_table :articles_playlists, id: false do |t|
      t.belongs_to :article
      t.belongs_to :playlist
    end

    add_index :articles_playlists, [:article_id, :playlist_id], unique: true
  end
end
