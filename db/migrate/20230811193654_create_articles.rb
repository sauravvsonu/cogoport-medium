class CreateArticles < ActiveRecord::Migration[7.0]
  def change
    create_table :articles do |t|
      t.string :title
      t.string :topic
      t.text :description
      t.string :author
      t.integer :post_likes
      t.integer :post_comments
      t.integer :minutes_to_read
      t.datetime :published_at
      t.timestamps
    end
  end
end
