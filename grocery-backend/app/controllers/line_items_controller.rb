class LineItemsController < ApplicationController
  

def create
  # cart = Cart.find(params[:cart_id])
  
  line_item = LineItem.create(cart_id: params[:cart_id], item_id: params[:item_id], quantity: params[:quantity])
  render json: LineitemSerializer.new(line_item).to_serialized_json
  
  end
  
 

  def destroy
    render json: LineItem.find(params[:id]).destroy
  end

  
end