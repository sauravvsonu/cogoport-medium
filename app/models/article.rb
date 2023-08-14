class Article < ApplicationRecord
    has_one_attached :file
    belongs_to :user
    has_many :saved_articles
    scope :draft, -> {where(published_at: nil)}
    
    has_many :article_revisions, dependent: :destroy
    has_and_belongs_to_many :playlists
end
