class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include Devise::JWT::RevocationStrategies::JTIMatcher
  devise :database_authenticatable, :registerable, :recoverable,
    :rememberable, :validatable, :jwt_authenticatable, jwt_revocation_strategy: self

    has_one :profile
    has_many :articles
    has_many :playlists

    has_many :saved_articles

    has_many :follower_relationships, class_name: 'Follower', foreign_key: 'follower_id'
    has_many :following_relationships, class_name: 'Follower', foreign_key: 'following_id'

    has_many :followers, through: :following_relationships, source: :follower_user
    has_many :following, through: :follower_relationships, source: :following_user

    def follow(other_user)
      following << other_user
    end
  
    def unfollow(other_user)
      following.delete(other_user)
    end
  
    def following?(other_user)
      following.include?(other_user)
    end
end
