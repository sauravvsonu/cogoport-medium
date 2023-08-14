class AddInterestedTopicsToProfile < ActiveRecord::Migration[7.0]
  def change
    add_column :profiles, :interested_topics, :string
    add_column :profiles, :save_for_later, :integer
  end
end
