class Cart < ApplicationRecord
    has_many :line_items
    has_many :items, through: :line_items

    def add_item(item_id, quantity)
        
        
      end

    def total_price
        line_items.to_a.sum { |item| item.total_price }
    end

end
