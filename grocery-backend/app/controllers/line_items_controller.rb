class LineItemsController < ApplicationController
  
def create
  cart = Cart.find(params[:cart_id])
  cart.add_item(params[:item_id], params[:quantity])

  render json: { status: 'SUCCESS', message: 'Item added to cart.' }, status: :created
  end
  
  def update
    cart = Cart.find(params[:cart_id])
        cart.update_cart_item(params[:item_id], params[:quantity])

        render json: { status: 'SUCCESS', message: 'Item quantity updated.' }, status: :ok
  end

  def destroy
    line_item = LineItem.find_by!(item_id: params[:item_id], cart_id: params[:cart_id])
    line_item.destroy!

    render json: { status: 'SUCCESS', message: 'Item removed from cart.' }, status: :ok
  end

  
end