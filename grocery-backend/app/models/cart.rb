class Cart < ApplicationRecord
    has_many :line_items, dependent: :destroy
    has_many :items, through: :line_items


    def subtotal
        self.line_items.sum { |line_item| line_item.item.price * line_item.quantity }
    end

end
