class LineItemsController < ApplicationController
  

def create
   cart = Cart.find(params[:cart_id])
  line_item = LineItem.find_by(cart_id: params[:cart_id], item_id: params[:item_id])
  if line_item
    line_item.update(quantity: line_item.quantity + params[:quantity].to_i)
  else
    line_item = LineItem.create(cart_id: params[:cart_id], item_id: params[:item_id], quantity: params[:quantity])
  end
  #render json: LineitemSerializer.new(line_item).to_serialized_json
  redirect_to cart
end
  
 

  def destroy
    render json: LineItem.find(params[:id]).destroy
  end

  
end