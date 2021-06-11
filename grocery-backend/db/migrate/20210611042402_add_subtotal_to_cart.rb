class AddSubtotalToCart < ActiveRecord::Migration[6.1]
  def change
    add_column :carts, :subtotal, :integer, :default => 0
  end
end
