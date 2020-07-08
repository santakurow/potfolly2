class AddCategroyIdToPortfolio < ActiveRecord::Migration[6.0]
  def change
    add_reference :portfolios, :category, foreign_key: true
  end
end
