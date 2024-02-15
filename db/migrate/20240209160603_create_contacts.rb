class CreateContacts < ActiveRecord::Migration[6.0]
  def change
    create_table :contacts do |t|
      t.string :phone
      t.string :address
      t.string :address2
      t.string :country
      t.integer :zipcode
      t.references :customer, null: false, foreign_key: true

      t.timestamps
    end
  end
end
