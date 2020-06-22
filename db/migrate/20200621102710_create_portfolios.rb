class CreatePortfolios < ActiveRecord::Migration[6.0]
  def change
    create_table :portfolios do |t|
      t.string :title
      t.string :url
      t.text :desc
      t.references :user

      t.timestamps
    end
  end
end
