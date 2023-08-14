class CreateArticleRevisions < ActiveRecord::Migration[7.0]
  def change
    create_table :article_revisions do |t|
      t.references :article, null: false, foreign_key: true
      t.string :title
      t.string :topic
      t.text :description
      t.string :author

      t.timestamps
    end
  end
end
