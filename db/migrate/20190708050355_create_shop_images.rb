class CreateShopImages < ActiveRecord::Migration[5.2]
  def change
    create_table :shop_images do |t|
      t.string :name
      t.references :shop, foreign_key: true, null: false

      t.timestamps
    end
  end
end
