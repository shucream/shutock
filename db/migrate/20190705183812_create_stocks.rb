class CreateStocks < ActiveRecord::Migration[5.2]
  def change
    create_table :stocks do |t|
      t.integer :product, foreign_key: true, index: false, null: false
      t.integer :shop, foreign_key: true, index: false, null: false
      t.integer :quantity, null: false

      t.timestamps
    end

    add_index :stocks, [:product, :shop], unique: true
  end
end
