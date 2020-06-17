class CreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :nickname
      t.string :firstname
      t.string :lastname
      t.string :email
      t.text :pr

      t.timestamps
    end
  end
end
