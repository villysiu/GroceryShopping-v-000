class ItemsController < ApplicationController
    def index
        items = Item.all
        #render json: ItemSerializer.new(items).to_serialized_json
        render json: items
     end
   
end
