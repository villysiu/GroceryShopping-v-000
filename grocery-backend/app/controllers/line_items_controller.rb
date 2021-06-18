class LineItemsController < ApplicationController
  

def create
   cart = Cart.find(params[:cart_id])

  line_item = LineItem.find_by(cart_id: params[:cart_id], item_id: params[:item_id])
  if line_item
    line_item.update(quantity: line_item.quantity + params[:quantity].to_i)
  else
    line_item = LineItem.create(cart_id: params[:cart_id], item_id: params[:item_id], quantity: params[:quantity])
   
  end
  render json: LineItemSerializer.new(line_item).to_serialized_json
 
end

def update
  line_item = LineItem.find(params[:id])
  cart = Cart.find(line_item.cart_id)

   line_item.update(quantity: params[:quantity].to_i)
   if line_item.quantity == 0
      line_item.destroy
   end
   

render json: LineItemSerializer.new(line_item).to_serialized_json
  end
 
  def destroy
    line_item = LineItem.find(params[:id])
    cart = Cart.find(line_item.cart_id)
    line_item.destroy
    render json: LineItemSerializer.new(line_item).to_serialized_json

    #render json: LineItem.find(params[:id]).destroy
  end

  
end