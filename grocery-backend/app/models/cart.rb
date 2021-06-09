class Cart < ApplicationRecord
    has_many :items, dependent: :destroy
    has_many :items, through: :lineitems
end
