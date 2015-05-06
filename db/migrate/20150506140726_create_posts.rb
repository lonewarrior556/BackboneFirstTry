class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.text :body, null: false
      t.integer :user_id, null: false, default: 1
      t.string :title, null: false

      t.timestamps
    end
  end
end
