class Profile < ApplicationRecord
    serialize :interested_topics, Array
    serialize :save_for_later, Array
    belongs_to :user
end
