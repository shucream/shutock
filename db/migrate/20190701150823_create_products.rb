class CreateProducts < ActiveRecord::Migration[5.2]
  def change
    create_table :products do |t|
      t.string :name, null: false, limit: 100, unique: true
      t.text :description, limit: 500
      t.integer :price, null: false

      t.timestamps
    end
  end
end
