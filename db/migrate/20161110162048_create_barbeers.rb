class CreateBarbeers < ActiveRecord::Migration[5.0]
  def change
    create_table :barbeers do |t|
      t.integer :bar_id
      t.integer :beer_id

      t.timestamps
    end
  end
end
