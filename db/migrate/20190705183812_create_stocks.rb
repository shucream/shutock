class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.references :product, foreign_key: true, index: false, null: false
      t.references :shop, foreign_key: true, index: false, null: false
      t.integer :quantity, null: false

      t.timestamps
    end

    add_index :stocks, [:product_id, :shop_id], unique: true
  end
end
